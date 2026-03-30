from __future__ import annotations

import json

import httpx
import structlog

from ..config import SurfaceConfig
from ..models import Event
from .base import Surface

logger = structlog.get_logger()


class WebhookSurface(Surface):
    def __init__(self, config: SurfaceConfig) -> None:
        super().__init__(config)
        self.url: str = config.extra.get("url", "")
        self._client: httpx.AsyncClient | None = None

    async def handle(self, event: Event) -> None:
        if not self.url:
            logger.warning("webhook surface has no URL configured")
            return
        if self._client is None:
            self._client = httpx.AsyncClient()
        payload = event.to_dict()
        resp = await self._client.post(
            self.url,
            content=json.dumps(payload),
            headers={"Content-Type": "application/json"},
        )
        logger.info("webhook posted", url=self.url, status=resp.status_code)

    async def close(self) -> None:
        if self._client:
            await self._client.aclose()
