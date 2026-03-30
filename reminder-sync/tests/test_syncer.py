from reminder_sync.syncer import _parse_vtodo
from reminder_sync.models import ReminderStatus


class TestParseVtodo:
    def test_parse_basic(self, sample_vtodo: str) -> None:
        rem = _parse_vtodo(sample_vtodo, "Groceries")
        assert rem is not None
        assert rem.uid == "test-uid-001"
        assert rem.title == "Buy groceries"
        assert rem.notes == "Milk, eggs, bread"
        assert rem.priority == 1
        assert rem.list_name == "Groceries"
        assert rem.status == ReminderStatus.PENDING
        assert rem.due is not None

    def test_parse_completed(self, completed_vtodo: str) -> None:
        rem = _parse_vtodo(completed_vtodo, "Tax")
        assert rem is not None
        assert rem.uid == "test-uid-002"
        assert rem.status == ReminderStatus.COMPLETED
        assert rem.completed_at is not None

    def test_parse_empty(self) -> None:
        data = "BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR"
        assert _parse_vtodo(data, "X") is None

    def test_parse_no_uid(self) -> None:
        data = """\
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VTODO
SUMMARY:No UID
END:VTODO
END:VCALENDAR"""
        assert _parse_vtodo(data, "X") is None
