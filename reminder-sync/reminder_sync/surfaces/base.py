from __future__ import annotations

import abc

from ..config import SurfaceConfig
from ..models import Event


class Surface(abc.ABC):
    """Base class for notification surfaces."""

    def __init__(self, config: SurfaceConfig) -> None:
        self.config = config

    @abc.abstractmethod
    async def handle(self, event: Event) -> None:
        """Handle an event."""

    async def close(self) -> None:
        """Clean up resources. Override if needed."""
