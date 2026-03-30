from __future__ import annotations

import structlog

from .config import Config, SurfaceConfig
from .models import Event
from .surfaces import SURFACE_REGISTRY
from .surfaces.base import Surface

logger = structlog.get_logger()


class Dispatcher:
    """Routes events to enabled surfaces."""

    def __init__(self, config: Config) -> None:
        self._surfaces: list[tuple[SurfaceConfig, Surface]] = []
        for name, scfg in config.surfaces.items():
            if not scfg.enabled:
                continue
            cls = SURFACE_REGISTRY.get(name)
            if cls is None:
                logger.warning("unknown surface in config, skipping", surface=name)
                continue
            surface = cls(scfg)
            self._surfaces.append((scfg, surface))
            logger.info("surface enabled", surface=name, events=scfg.events)

    async def dispatch(self, event: Event) -> None:
        """Send event to all surfaces that accept it."""
        for scfg, surface in self._surfaces:
            if scfg.accepts_event(event.type.value):
                try:
                    await surface.handle(event)
                except Exception:
                    logger.exception(
                        "surface handler failed",
                        surface=type(surface).__name__,
                        event=event.type.value,
                    )

    async def close(self) -> None:
        for _, surface in self._surfaces:
            try:
                await surface.close()
            except Exception:
                logger.exception("surface close failed", surface=type(surface).__name__)

    @property
    def surface_names(self) -> list[str]:
        return [type(s).__name__ for _, s in self._surfaces]
