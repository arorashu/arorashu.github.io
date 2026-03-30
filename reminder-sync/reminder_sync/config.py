from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

DEFAULT_CONFIG_PATH = Path.home() / ".config" / "reminder-sync" / "config.yaml"

DEFAULT_CONFIG = """\
icloud:
  username: "user@icloud.com"
  # App-specific password — set ICLOUD_APP_PASSWORD env var
  password_env: "ICLOUD_APP_PASSWORD"

sync:
  interval_seconds: 60
  reminder_lists: []  # empty = all lists
  due_soon_lookahead_minutes: 15

surfaces:
  desktop_notification:
    enabled: true
    events: [reminder.created, reminder.due_soon]

  webhook:
    enabled: false
    url: "http://localhost:8123/api/webhook/reminders"
    events: [reminder.created, reminder.completed]

  shell_command:
    enabled: false
    command: "/home/user/scripts/on-reminder.sh"
    events: [reminder.created]

  claude_code_loop:
    enabled: false
    prompt_directory: "/home/user/claude-prompts/"
    prompt_template: "New task from Reminders: {title}\\nNotes: {notes}\\nDue: {due}\\nPriority: {priority}\\n\\nFigure out what needs to be done and execute it."
    events: [reminder.created]

  email:
    enabled: false
    smtp_host: "localhost"
    smtp_port: 25
    from: "reminders@localhost"
    to: "user@example.com"
    events: [reminder.created, reminder.due_soon]

  log_file:
    enabled: true
    path: "/var/log/reminder-sync/events.jsonl"
    events: ["*"]

  terminal:
    enabled: true
    bell: true
    events: [reminder.created, reminder.due_soon]

logging:
  level: INFO
  file: "/var/log/reminder-sync/daemon.log"
"""


@dataclass
class ICloudConfig:
    username: str = ""
    password_env: str = "ICLOUD_APP_PASSWORD"
    password_keyring: str = ""

    def get_password(self) -> str:
        if self.password_env:
            pw = os.environ.get(self.password_env, "")
            if pw:
                return pw
        if self.password_keyring:
            try:
                import keyring
                pw = keyring.get_password("icloud-reminder-sync", self.password_keyring)
                if pw:
                    return pw
            except ImportError:
                pass
        return ""


@dataclass
class SyncConfig:
    interval_seconds: int = 60
    reminder_lists: list[str] = field(default_factory=list)
    due_soon_lookahead_minutes: int = 15


@dataclass
class SurfaceConfig:
    enabled: bool = False
    events: list[str] = field(default_factory=list)
    extra: dict[str, Any] = field(default_factory=dict)

    def accepts_event(self, event_type: str) -> bool:
        return "*" in self.events or event_type in self.events


@dataclass
class LoggingConfig:
    level: str = "INFO"
    file: str = ""


@dataclass
class Config:
    icloud: ICloudConfig = field(default_factory=ICloudConfig)
    sync: SyncConfig = field(default_factory=SyncConfig)
    surfaces: dict[str, SurfaceConfig] = field(default_factory=dict)
    logging: LoggingConfig = field(default_factory=LoggingConfig)


def load_config(path: Path | None = None) -> Config:
    """Load config from YAML file."""
    config_path = path or DEFAULT_CONFIG_PATH
    if not config_path.exists():
        return Config()

    with open(config_path) as f:
        raw = yaml.safe_load(f) or {}

    return _parse_config(raw)


def _parse_config(raw: dict[str, Any]) -> Config:
    icloud_raw = raw.get("icloud", {})
    icloud = ICloudConfig(
        username=icloud_raw.get("username", ""),
        password_env=icloud_raw.get("password_env", "ICLOUD_APP_PASSWORD"),
        password_keyring=icloud_raw.get("password_keyring", ""),
    )

    sync_raw = raw.get("sync", {})
    sync = SyncConfig(
        interval_seconds=sync_raw.get("interval_seconds", 60),
        reminder_lists=sync_raw.get("reminder_lists", []),
        due_soon_lookahead_minutes=sync_raw.get("due_soon_lookahead_minutes", 15),
    )

    surfaces: dict[str, SurfaceConfig] = {}
    for name, sraw in raw.get("surfaces", {}).items():
        if not isinstance(sraw, dict):
            continue
        enabled = sraw.pop("enabled", False)
        events = sraw.pop("events", [])
        surfaces[name] = SurfaceConfig(enabled=enabled, events=events, extra=sraw)

    logging_raw = raw.get("logging", {})
    logging_cfg = LoggingConfig(
        level=logging_raw.get("level", "INFO"),
        file=logging_raw.get("file", ""),
    )

    return Config(icloud=icloud, sync=sync, surfaces=surfaces, logging=logging_cfg)
