from __future__ import annotations

import asyncio
import os

import structlog

from ..config import SurfaceConfig
from ..models import Event
from .base import Surface

logger = structlog.get_logger()


class ShellCommandSurface(Surface):
    def __init__(self, config: SurfaceConfig) -> None:
        super().__init__(config)
        self.command: str = config.extra.get("command", "")

    async def handle(self, event: Event) -> None:
        if not self.command:
            logger.warning("shell_command surface has no command configured")
            return
        env = {**os.environ, **event.reminder.to_env()}
        proc = await asyncio.create_subprocess_shell(
            self.command,
            env=env,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, stderr = await proc.communicate()
        logger.info(
            "shell command executed",
            command=self.command,
            returncode=proc.returncode,
            stdout=stdout.decode(),
            stderr=stderr.decode(),
        )
