from __future__ import annotations

import asyncio

import structlog

from ..config import SurfaceConfig
from ..models import Event
from .base import Surface

logger = structlog.get_logger()


class DesktopNotificationSurface(Surface):
    def __init__(self, config: SurfaceConfig) -> None:
        super().__init__(config)

    async def handle(self, event: Event) -> None:
        rem = event.reminder
        summary = f"Reminder: {rem.title}"
        body_parts = [f"List: {rem.list_name}"] if rem.list_name else []
        if rem.due:
            body_parts.append(f"Due: {rem.due.strftime('%Y-%m-%d %H:%M')}")
        body = "\n".join(body_parts)

        proc = await asyncio.create_subprocess_exec(
            "notify-send", summary, body,
            stdout=asyncio.subprocess.DEVNULL,
            stderr=asyncio.subprocess.PIPE,
        )
        _, stderr = await proc.communicate()
        if proc.returncode != 0:
            logger.warning("notify-send failed", returncode=proc.returncode, stderr=stderr.decode())
