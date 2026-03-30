from datetime import datetime, timedelta

import pytest
import pytest_asyncio

from reminder_sync.models import EventType, Reminder, ReminderStatus
from reminder_sync.store import StateStore


@pytest_asyncio.fixture
async def store():
    s = StateStore()  # in-memory
    await s.open()
    yield s
    await s.close()


@pytest.mark.asyncio
class TestStateStore:
    async def test_new_reminder_creates_event(self, store: StateStore) -> None:
        reminders = [Reminder(uid="r1", title="Test")]
        events = await store.diff(reminders)
        assert len(events) == 1
        assert events[0].type == EventType.CREATED
        assert events[0].reminder.uid == "r1"

    async def test_unchanged_reminder_no_event(self, store: StateStore) -> None:
        reminders = [Reminder(uid="r1", title="Test")]
        await store.diff(reminders)
        events = await store.diff(reminders)
        assert len(events) == 0

    async def test_updated_reminder(self, store: StateStore) -> None:
        await store.diff([Reminder(uid="r1", title="Old")])
        events = await store.diff([Reminder(uid="r1", title="New")])
        assert len(events) == 1
        assert events[0].type == EventType.UPDATED

    async def test_completed_reminder(self, store: StateStore) -> None:
        await store.diff([Reminder(uid="r1", title="T", status=ReminderStatus.PENDING)])
        events = await store.diff(
            [Reminder(uid="r1", title="T", status=ReminderStatus.COMPLETED)]
        )
        assert len(events) == 1
        assert events[0].type == EventType.COMPLETED

    async def test_deleted_reminder(self, store: StateStore) -> None:
        await store.diff([Reminder(uid="r1", title="T")])
        events = await store.diff([])
        assert len(events) == 1
        assert events[0].type == EventType.DELETED
        assert events[0].reminder.uid == "r1"

    async def test_due_soon(self, store: StateStore) -> None:
        soon = datetime.utcnow() + timedelta(minutes=5)
        reminders = [Reminder(uid="r1", title="T", due=soon)]
        events = await store.diff(reminders, lookahead_minutes=15)
        types = {e.type for e in events}
        assert EventType.DUE_SOON in types
        assert EventType.CREATED in types

    async def test_due_not_soon(self, store: StateStore) -> None:
        far = datetime.utcnow() + timedelta(hours=5)
        reminders = [Reminder(uid="r1", title="T", due=far)]
        events = await store.diff(reminders, lookahead_minutes=15)
        types = {e.type for e in events}
        assert EventType.DUE_SOON not in types

    async def test_count_and_get_all(self, store: StateStore) -> None:
        await store.diff([
            Reminder(uid="r1", title="A"),
            Reminder(uid="r2", title="B"),
        ])
        assert await store.count() == 2
        all_rems = await store.get_all()
        assert len(all_rems) == 2

    async def test_last_updated(self, store: StateStore) -> None:
        assert await store.last_updated() is None
        await store.diff([Reminder(uid="r1", title="A")])
        assert await store.last_updated() is not None
