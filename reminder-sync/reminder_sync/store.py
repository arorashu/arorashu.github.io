from __future__ import annotations

from datetime import datetime, timedelta
from typing import Sequence

import aiosqlite

from .models import EventType, Reminder, ReminderStatus, Event

CREATE_TABLE = """\
CREATE TABLE IF NOT EXISTS reminders (
    uid TEXT PRIMARY KEY,
    title TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    due TEXT,
    priority INTEGER NOT NULL DEFAULT 0,
    list_name TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    completed_at TEXT,
    first_seen_at TEXT NOT NULL,
    last_updated_at TEXT NOT NULL
)
"""


class StateStore:
    def __init__(self, db_path: str = ""):
        self._db_path = db_path or ":memory:"
        self._db: aiosqlite.Connection | None = None

    async def open(self) -> None:
        self._db = await aiosqlite.connect(self._db_path)
        await self._db.execute(CREATE_TABLE)
        await self._db.commit()

    async def close(self) -> None:
        if self._db:
            await self._db.close()
            self._db = None

    async def diff(
        self, incoming: Sequence[Reminder], lookahead_minutes: int = 15
    ) -> list[Event]:
        """Compare incoming reminders against stored state and return events."""
        assert self._db is not None
        events: list[Event] = []
        now = datetime.utcnow()
        now_str = now.isoformat()
        seen_uids: set[str] = set()

        for rem in incoming:
            seen_uids.add(rem.uid)
            cursor = await self._db.execute(
                "SELECT uid, title, status, due, priority, list_name, notes, completed_at FROM reminders WHERE uid = ?",
                (rem.uid,),
            )
            row = await cursor.fetchone()

            if row is None:
                # New reminder
                events.append(Event(type=EventType.CREATED, reminder=rem, timestamp=now))
                await self._db.execute(
                    "INSERT INTO reminders (uid, title, status, due, priority, list_name, notes, completed_at, first_seen_at, last_updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (
                        rem.uid,
                        rem.title,
                        rem.status.value,
                        rem.due.isoformat() if rem.due else None,
                        rem.priority,
                        rem.list_name,
                        rem.notes,
                        rem.completed_at.isoformat() if rem.completed_at else None,
                        now_str,
                        now_str,
                    ),
                )
            else:
                old_status = row[2]
                old_title = row[1]
                old_due = row[3]
                old_priority = row[4]
                old_list_name = row[5]
                old_notes = row[6]

                new_due_str = rem.due.isoformat() if rem.due else None

                if rem.status == ReminderStatus.COMPLETED and old_status != "completed":
                    events.append(Event(type=EventType.COMPLETED, reminder=rem, timestamp=now))
                elif (
                    old_title != rem.title
                    or old_due != new_due_str
                    or old_priority != rem.priority
                    or old_list_name != rem.list_name
                    or old_notes != rem.notes
                ):
                    events.append(Event(type=EventType.UPDATED, reminder=rem, timestamp=now))

                await self._db.execute(
                    "UPDATE reminders SET title=?, status=?, due=?, priority=?, list_name=?, notes=?, completed_at=?, last_updated_at=? WHERE uid=?",
                    (
                        rem.title,
                        rem.status.value,
                        new_due_str,
                        rem.priority,
                        rem.list_name,
                        rem.notes,
                        rem.completed_at.isoformat() if rem.completed_at else None,
                        now_str,
                        rem.uid,
                    ),
                )

            # Check due_soon
            if (
                rem.status == ReminderStatus.PENDING
                and rem.due
                and now <= rem.due <= now + timedelta(minutes=lookahead_minutes)
            ):
                events.append(Event(type=EventType.DUE_SOON, reminder=rem, timestamp=now))

        # Detect deletions
        cursor = await self._db.execute("SELECT uid, title, status, due, priority, list_name, notes, completed_at FROM reminders")
        all_rows = await cursor.fetchall()
        for row in all_rows:
            if row[0] not in seen_uids:
                deleted_rem = Reminder(
                    uid=row[0],
                    title=row[1],
                    status=ReminderStatus(row[2]),
                    due=datetime.fromisoformat(row[3]) if row[3] else None,
                    priority=row[4],
                    list_name=row[5],
                    notes=row[6],
                    completed_at=datetime.fromisoformat(row[7]) if row[7] else None,
                )
                events.append(Event(type=EventType.DELETED, reminder=deleted_rem, timestamp=now))
                await self._db.execute("DELETE FROM reminders WHERE uid = ?", (row[0],))

        await self._db.commit()
        return events

    async def get_all(self) -> list[Reminder]:
        assert self._db is not None
        cursor = await self._db.execute(
            "SELECT uid, title, status, due, priority, list_name, notes, completed_at FROM reminders"
        )
        rows = await cursor.fetchall()
        return [
            Reminder(
                uid=row[0],
                title=row[1],
                status=ReminderStatus(row[2]),
                due=datetime.fromisoformat(row[3]) if row[3] else None,
                priority=row[4],
                list_name=row[5],
                notes=row[6],
                completed_at=datetime.fromisoformat(row[7]) if row[7] else None,
            )
            for row in rows
        ]

    async def count(self) -> int:
        assert self._db is not None
        cursor = await self._db.execute("SELECT COUNT(*) FROM reminders")
        row = await cursor.fetchone()
        return row[0] if row else 0

    async def last_updated(self) -> datetime | None:
        assert self._db is not None
        cursor = await self._db.execute(
            "SELECT MAX(last_updated_at) FROM reminders"
        )
        row = await cursor.fetchone()
        if row and row[0]:
            return datetime.fromisoformat(row[0])
        return None
