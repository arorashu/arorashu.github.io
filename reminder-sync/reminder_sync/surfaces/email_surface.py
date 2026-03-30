from __future__ import annotations

import asyncio
import email.message
import smtplib

import structlog

from ..config import SurfaceConfig
from ..models import Event
from .base import Surface

logger = structlog.get_logger()


class EmailSurface(Surface):
    def __init__(self, config: SurfaceConfig) -> None:
        super().__init__(config)
        self.smtp_host: str = config.extra.get("smtp_host", "localhost")
        self.smtp_port: int = config.extra.get("smtp_port", 25)
        self.from_addr: str = config.extra.get("from", "reminders@localhost")
        self.to_addr: str = config.extra.get("to", "")

    async def handle(self, event: Event) -> None:
        if not self.to_addr:
            logger.warning("email surface has no 'to' address configured")
            return
        rem = event.reminder
        msg = email.message.EmailMessage()
        msg["Subject"] = f"[Reminder] {event.type.value}: {rem.title}"
        msg["From"] = self.from_addr
        msg["To"] = self.to_addr

        due_str = rem.due.strftime("%Y-%m-%d %H:%M") if rem.due else "none"
        body = (
            f"Event: {event.type.value}\n"
            f"Title: {rem.title}\n"
            f"List: {rem.list_name}\n"
            f"Due: {due_str}\n"
            f"Priority: {rem.priority}\n"
            f"Notes: {rem.notes}\n"
        )
        msg.set_content(body)

        loop = asyncio.get_running_loop()
        await loop.run_in_executor(None, self._send, msg)

    def _send(self, msg: email.message.EmailMessage) -> None:
        try:
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.send_message(msg)
            logger.info("email sent", to=self.to_addr)
        except Exception:
            logger.exception("email send failed")
