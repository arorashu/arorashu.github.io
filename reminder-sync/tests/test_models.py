from datetime import datetime

from reminder_sync.models import Event, EventType, Reminder, ReminderStatus


class TestReminder:
    def test_to_env(self) -> None:
        rem = Reminder(
            uid="abc",
            title="Test",
            due=datetime(2025, 1, 15, 9, 0),
            priority=2,
            list_name="Work",
            notes="some notes",
        )
        env = rem.to_env()
        assert env["REMINDER_UID"] == "abc"
        assert env["REMINDER_TITLE"] == "Test"
        assert env["REMINDER_DUE"] == "2025-01-15T09:00:00"
        assert env["REMINDER_PRIORITY"] == "2"
        assert env["REMINDER_LIST"] == "Work"
        assert env["REMINDER_NOTES"] == "some notes"

    def test_to_env_no_due(self) -> None:
        rem = Reminder(uid="abc", title="Test")
        assert rem.to_env()["REMINDER_DUE"] == ""

    def test_to_dict(self) -> None:
        rem = Reminder(uid="x", title="Y", status=ReminderStatus.COMPLETED)
        d = rem.to_dict()
        assert d["status"] == "completed"
        assert d["uid"] == "x"


class TestEvent:
    def test_to_dict(self) -> None:
        rem = Reminder(uid="u1", title="T1")
        ev = Event(type=EventType.CREATED, reminder=rem, timestamp=datetime(2025, 1, 1))
        d = ev.to_dict()
        assert d["type"] == "reminder.created"
        assert d["reminder"]["uid"] == "u1"
        assert d["timestamp"] == "2025-01-01T00:00:00"
