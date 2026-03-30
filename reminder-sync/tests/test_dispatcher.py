from unittest.mock import AsyncMock, patch

import pytest

from reminder_sync.config import Config, SurfaceConfig
from reminder_sync.dispatcher import Dispatcher
from reminder_sync.models import Event, EventType, Reminder


@pytest.mark.asyncio
class TestDispatcher:
    async def test_dispatches_to_matching_surfaces(self) -> None:
        cfg = Config(
            surfaces={
                "terminal": SurfaceConfig(enabled=True, events=["reminder.created"]),
                "log_file": SurfaceConfig(enabled=True, events=["*"], extra={"path": "/tmp/test.jsonl"}),
            }
        )
        dispatcher = Dispatcher(cfg)
        event = Event(
            type=EventType.CREATED,
            reminder=Reminder(uid="d1", title="Dispatch Test"),
        )

        # Mock all surface handles
        for _, surface in dispatcher._surfaces:
            surface.handle = AsyncMock()

        await dispatcher.dispatch(event)

        for _, surface in dispatcher._surfaces:
            surface.handle.assert_called_once_with(event)

    async def test_skips_non_matching_events(self) -> None:
        cfg = Config(
            surfaces={
                "terminal": SurfaceConfig(enabled=True, events=["reminder.created"]),
            }
        )
        dispatcher = Dispatcher(cfg)
        event = Event(
            type=EventType.DELETED,
            reminder=Reminder(uid="d2", title="No Match"),
        )

        for _, surface in dispatcher._surfaces:
            surface.handle = AsyncMock()

        await dispatcher.dispatch(event)

        for _, surface in dispatcher._surfaces:
            surface.handle.assert_not_called()

    async def test_disabled_surfaces_not_loaded(self) -> None:
        cfg = Config(
            surfaces={
                "terminal": SurfaceConfig(enabled=False, events=["*"]),
            }
        )
        dispatcher = Dispatcher(cfg)
        assert len(dispatcher._surfaces) == 0

    async def test_close(self) -> None:
        cfg = Config(
            surfaces={
                "terminal": SurfaceConfig(enabled=True, events=["*"]),
            }
        )
        dispatcher = Dispatcher(cfg)
        for _, surface in dispatcher._surfaces:
            surface.close = AsyncMock()
        await dispatcher.close()
        for _, surface in dispatcher._surfaces:
            surface.close.assert_called_once()
