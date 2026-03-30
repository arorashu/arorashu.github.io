from __future__ import annotations

import asyncio
import json
import os
import sys
from datetime import datetime
from pathlib import Path

import click
import structlog

from .config import DEFAULT_CONFIG, DEFAULT_CONFIG_PATH, load_config
from .daemon import Daemon
from .dispatcher import Dispatcher
from .models import Event, EventType, Reminder, ReminderStatus
from .surfaces import SURFACE_REGISTRY


def _setup_logging(level: str, log_file: str) -> None:
    processors = [
        structlog.stdlib.add_log_level,
        structlog.dev.ConsoleRenderer(),
    ]
    structlog.configure(
        processors=processors,
        wrapper_class=structlog.stdlib.BoundLogger,
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
    )


@click.group()
def cli() -> None:
    """iCloud Reminders sync daemon."""


@cli.command()
@click.option("--config", "-c", "config_path", type=click.Path(exists=True), default=None)
@click.option("--daemon", "daemonize", is_flag=True, default=False, help="Run in background with PID file")
def run(config_path: str | None, daemonize: bool) -> None:
    """Start the sync daemon."""
    cfg = load_config(Path(config_path) if config_path else None)
    _setup_logging(cfg.logging.level, cfg.logging.file)

    if daemonize:
        pid = os.fork()
        if pid > 0:
            pid_path = Path.home() / ".local" / "share" / "reminder-sync" / "daemon.pid"
            pid_path.parent.mkdir(parents=True, exist_ok=True)
            pid_path.write_text(str(pid))
            click.echo(f"Daemon started with PID {pid}")
            sys.exit(0)

    d = Daemon(cfg)
    asyncio.run(d.run())


@cli.command("sync-once")
@click.option("--config", "-c", "config_path", type=click.Path(exists=True), default=None)
def sync_once(config_path: str | None) -> None:
    """Run a single sync cycle and exit."""
    cfg = load_config(Path(config_path) if config_path else None)
    _setup_logging(cfg.logging.level, cfg.logging.file)
    d = Daemon(cfg)
    events = asyncio.run(d.sync_once())
    click.echo(f"Sync complete: {len(events)} events")


@cli.command("test-surface")
@click.argument("surface_name")
@click.option("--config", "-c", "config_path", type=click.Path(exists=True), default=None)
def test_surface(surface_name: str, config_path: str | None) -> None:
    """Send a fake event to test a surface."""
    cfg = load_config(Path(config_path) if config_path else None)
    _setup_logging(cfg.logging.level, cfg.logging.file)

    scfg = cfg.surfaces.get(surface_name)
    if not scfg:
        click.echo(f"Surface '{surface_name}' not found in config.")
        sys.exit(1)

    cls = SURFACE_REGISTRY.get(surface_name)
    if not cls:
        click.echo(f"Unknown surface type: {surface_name}")
        sys.exit(1)

    fake_reminder = Reminder(
        uid="test-uid-12345",
        title="Test Reminder",
        status=ReminderStatus.PENDING,
        due=datetime.utcnow(),
        priority=1,
        list_name="Test List",
        notes="This is a test reminder from reminder-sync.",
    )
    fake_event = Event(
        type=EventType.CREATED,
        reminder=fake_reminder,
    )

    surface = cls(scfg)

    async def _run() -> None:
        await surface.handle(fake_event)
        await surface.close()

    asyncio.run(_run())
    click.echo(f"Test event sent to {surface_name}")


@cli.command()
@click.option("--config", "-c", "config_path", type=click.Path(exists=True), default=None)
def status(config_path: str | None) -> None:
    """Show sync status."""
    cfg = load_config(Path(config_path) if config_path else None)
    _setup_logging(cfg.logging.level, cfg.logging.file)
    d = Daemon(cfg)
    info = asyncio.run(d.status())
    click.echo(json.dumps(info, indent=2))


@cli.command()
def init() -> None:
    """Generate a default config file."""
    if DEFAULT_CONFIG_PATH.exists():
        click.echo(f"Config already exists at {DEFAULT_CONFIG_PATH}")
        sys.exit(1)
    DEFAULT_CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    DEFAULT_CONFIG_PATH.write_text(DEFAULT_CONFIG)
    click.echo(f"Config written to {DEFAULT_CONFIG_PATH}")
