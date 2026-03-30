from __future__ import annotations

import enum
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any


class ReminderStatus(enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"


class EventType(enum.Enum):
    CREATED = "reminder.created"
    UPDATED = "reminder.updated"
    COMPLETED = "reminder.completed"
    DELETED = "reminder.deleted"
    DUE_SOON = "reminder.due_soon"


@dataclass(frozen=True)
class Reminder:
    uid: str
    title: str
    status: ReminderStatus = ReminderStatus.PENDING
    due: datetime | None = None
    priority: int = 0
    list_name: str = ""
    notes: str = ""
    completed_at: datetime | None = None

    def to_env(self) -> dict[str, str]:
        """Return reminder data as env-var-friendly dict."""
        return {
            "REMINDER_UID": self.uid,
            "REMINDER_TITLE": self.title,
            "REMINDER_DUE": self.due.isoformat() if self.due else "",
            "REMINDER_PRIORITY": str(self.priority),
            "REMINDER_LIST": self.list_name,
            "REMINDER_NOTES": self.notes,
        }

    def to_dict(self) -> dict[str, Any]:
        return {
            "uid": self.uid,
            "title": self.title,
            "status": self.status.value,
            "due": self.due.isoformat() if self.due else None,
            "priority": self.priority,
            "list_name": self.list_name,
            "notes": self.notes,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
        }


@dataclass(frozen=True)
class Event:
    type: EventType
    reminder: Reminder
    timestamp: datetime = field(default_factory=datetime.utcnow)

    def to_dict(self) -> dict[str, Any]:
        return {
            "type": self.type.value,
            "reminder": self.reminder.to_dict(),
            "timestamp": self.timestamp.isoformat(),
        }
