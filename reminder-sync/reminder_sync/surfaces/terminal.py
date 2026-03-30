from __future__ import annotations

import sys

from ..config import SurfaceConfig
from ..models import Event
from .base import Surface


class TerminalSurface(Surface):
    def __init__(self, config: SurfaceConfig) -> None:
        super().__init__(config)
        self.bell = config.extra.get("bell", False)

    async def handle(self, event: Event) -> None:
        rem = event.reminder
        due_str = rem.due.strftime("%Y-%m-%d %H:%M") if rem.due else "no due date"
        line = f"[{event.type.value}] {rem.title} (list={rem.list_name}, due={due_str})"
        print(line, flush=True)
        if self.bell:
            sys.stdout.write("\a")
            sys.stdout.flush()
