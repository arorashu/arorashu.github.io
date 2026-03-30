from __future__ import annotations

import uuid
from pathlib import Path

import structlog

from ..config import SurfaceConfig
from ..models import Event
from .base import Surface

logger = structlog.get_logger()

DEFAULT_TEMPLATE = (
    "New reminder: {title}. Notes: {notes}. "
    "Figure out what needs to be done and do it."
)


class ClaudeCodeLoopSurface(Surface):
    def __init__(self, config: SurfaceConfig) -> None:
        super().__init__(config)
        self.prompt_directory = Path(config.extra.get("prompt_directory", "/tmp/claude-prompts"))
        self.template: str = config.extra.get("prompt_template", DEFAULT_TEMPLATE)

    async def handle(self, event: Event) -> None:
        rem = event.reminder
        content = self.template.format(
            title=rem.title,
            notes=rem.notes,
            due=rem.due.isoformat() if rem.due else "none",
            priority=rem.priority,
            list_name=rem.list_name,
            uid=rem.uid,
        )
        self.prompt_directory.mkdir(parents=True, exist_ok=True)
        filename = f"reminder-{rem.uid}-{uuid.uuid4().hex[:8]}.md"
        path = self.prompt_directory / filename
        path.write_text(content)
        logger.info("claude prompt written", path=str(path))
