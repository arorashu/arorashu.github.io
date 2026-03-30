from __future__ import annotations

import pytest


@pytest.fixture
def sample_vtodo() -> str:
    return """\
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VTODO
UID:test-uid-001
SUMMARY:Buy groceries
DESCRIPTION:Milk, eggs, bread
PRIORITY:1
STATUS:NEEDS-ACTION
DUE:20250115T090000Z
END:VTODO
END:VCALENDAR"""


@pytest.fixture
def completed_vtodo() -> str:
    return """\
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VTODO
UID:test-uid-002
SUMMARY:File taxes
STATUS:COMPLETED
COMPLETED:20250110T120000Z
END:VTODO
END:VCALENDAR"""
