from __future__ import annotations

from datetime import datetime

import caldav
import structlog
from icalendar import Calendar

from .config import Config
from .models import Reminder, ReminderStatus

logger = structlog.get_logger()


class CalDAVSyncer:
    """Connects to iCloud CalDAV and fetches VTODO items."""

    ICLOUD_CALDAV_URL = "https://caldav.icloud.com/"

    def __init__(self, config: Config) -> None:
        self._config = config
        self._client: caldav.DAVClient | None = None

    def connect(self) -> None:
        password = self._config.icloud.get_password()
        if not password:
            raise RuntimeError(
                "No iCloud password found. Set the env var or configure keyring."
            )
        self._client = caldav.DAVClient(
            url=self.ICLOUD_CALDAV_URL,
            username=self._config.icloud.username,
            password=password,
        )
        logger.info("connected to iCloud CalDAV", username=self._config.icloud.username)

    def fetch_reminders(self) -> list[Reminder]:
        """Fetch all VTODO items from configured (or all) reminder lists."""
        if self._client is None:
            raise RuntimeError("Not connected. Call connect() first.")

        principal = self._client.principal()
        calendars = principal.calendars()
        allowed_lists = set(self._config.sync.reminder_lists)
        reminders: list[Reminder] = []

        for cal in calendars:
            cal_name = cal.name or ""
            if allowed_lists and cal_name not in allowed_lists:
                continue

            try:
                todos = cal.todos(include_completed=True)
            except Exception:
                logger.warning("failed to fetch todos from calendar", calendar=cal_name)
                continue

            for todo in todos:
                try:
                    rem = _parse_vtodo(todo.data, cal_name)
                    if rem:
                        reminders.append(rem)
                except Exception:
                    logger.warning("failed to parse VTODO", calendar=cal_name, exc_info=True)

        logger.info("fetched reminders", count=len(reminders))
        return reminders


def _parse_vtodo(vcal_data: str, list_name: str) -> Reminder | None:
    """Parse a VCALENDAR string containing a VTODO into a Reminder."""
    cal = Calendar.from_ical(vcal_data)
    for component in cal.walk():
        if component.name != "VTODO":
            continue

        uid = str(component.get("UID", ""))
        if not uid:
            return None

        title = str(component.get("SUMMARY", ""))
        notes = str(component.get("DESCRIPTION", ""))
        priority = int(component.get("PRIORITY", 0))

        status_str = str(component.get("STATUS", "")).upper()
        if status_str == "COMPLETED":
            status = ReminderStatus.COMPLETED
        else:
            status = ReminderStatus.PENDING

        due_prop = component.get("DUE")
        due: datetime | None = None
        if due_prop:
            dt = due_prop.dt
            if isinstance(dt, datetime):
                due = dt
            else:
                due = datetime.combine(dt, datetime.min.time())

        completed_prop = component.get("COMPLETED")
        completed_at: datetime | None = None
        if completed_prop:
            dt = completed_prop.dt
            if isinstance(dt, datetime):
                completed_at = dt
            else:
                completed_at = datetime.combine(dt, datetime.min.time())

        return Reminder(
            uid=uid,
            title=title,
            status=status,
            due=due,
            priority=priority,
            list_name=list_name,
            notes=notes,
            completed_at=completed_at,
        )
    return None
