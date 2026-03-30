from __future__ import annotations

import json
from pathlib import Path

import structlog

from ..config import SurfaceConfig
from ..models import Event
from .base import Surface

logger = structlog.get_logger()


class LogFileSurface(Surface):
    def __init__(self, config: SurfaceConfig) -> None:
        super().__init__(config)
        self.path = Path(config.extra.get("path", "/var/log/reminder-sync/events.jsonl"))

    async def handle(self, event: Event) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        line = json.dumps(event.to_dict()) + "\n"
        with open(self.path, "a") as f:
            f.write(line)
        logger.debug("event logged to file", path=str(self.path))
