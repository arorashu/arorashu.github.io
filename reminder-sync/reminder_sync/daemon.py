from __future__ import annotations

import asyncio
import signal
from pathlib import Path

import structlog

from .config import Config
from .dispatcher import Dispatcher
from .store import StateStore
from .syncer import CalDAVSyncer

logger = structlog.get_logger()


class Daemon:
    def __init__(self, config: Config, db_path: str = "") -> None:
        self._config = config
        self._db_path = db_path or str(
            Path.home() / ".local" / "share" / "reminder-sync" / "state.db"
        )
        self._store = StateStore(self._db_path)
        self._syncer = CalDAVSyncer(config)
        self._dispatcher = Dispatcher(config)
        self._running = False

    async def run(self) -> None:
        """Run the sync loop until stopped."""
        loop = asyncio.get_running_loop()
        self._running = True

        for sig in (signal.SIGTERM, signal.SIGINT):
            loop.add_signal_handler(sig, self._stop)

        # Ensure DB directory exists
        Path(self._db_path).parent.mkdir(parents=True, exist_ok=True)

        await self._store.open()
        self._syncer.connect()
        logger.info("daemon started", interval=self._config.sync.interval_seconds)

        try:
            while self._running:
                await self._sync_once()
                await asyncio.sleep(self._config.sync.interval_seconds)
        finally:
            await self._dispatcher.close()
            await self._store.close()
            logger.info("daemon stopped")

    async def sync_once(self) -> list:
        """Do a single sync cycle. Returns events."""
        Path(self._db_path).parent.mkdir(parents=True, exist_ok=True)
        await self._store.open()
        self._syncer.connect()
        try:
            return await self._sync_once()
        finally:
            await self._dispatcher.close()
            await self._store.close()

    async def _sync_once(self) -> list:
        try:
            reminders = self._syncer.fetch_reminders()
            events = await self._store.diff(
                reminders,
                lookahead_minutes=self._config.sync.due_soon_lookahead_minutes,
            )
            for event in events:
                await self._dispatcher.dispatch(event)
            logger.info("sync complete", events=len(events), reminders=len(reminders))
            return events
        except Exception:
            logger.exception("sync cycle failed")
            return []

    def _stop(self) -> None:
        logger.info("shutdown signal received")
        self._running = False

    async def status(self) -> dict:
        Path(self._db_path).parent.mkdir(parents=True, exist_ok=True)
        await self._store.open()
        try:
            count = await self._store.count()
            last = await self._store.last_updated()
            return {
                "reminder_count": count,
                "last_sync": last.isoformat() if last else None,
                "surfaces": self._dispatcher.surface_names,
            }
        finally:
            await self._store.close()
