import json
import os
from datetime import datetime
from pathlib import Path
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from reminder_sync.config import SurfaceConfig
from reminder_sync.models import Event, EventType, Reminder, ReminderStatus


def _make_event() -> Event:
    return Event(
        type=EventType.CREATED,
        reminder=Reminder(
            uid="s-uid",
            title="Surface Test",
            due=datetime(2025, 6, 1, 12, 0),
            priority=1,
            list_name="Work",
            notes="test notes",
        ),
        timestamp=datetime(2025, 1, 1),
    )


@pytest.mark.asyncio
class TestTerminalSurface:
    async def test_prints_output(self, capsys: pytest.CaptureFixture) -> None:
        from reminder_sync.surfaces.terminal import TerminalSurface

        cfg = SurfaceConfig(enabled=True, events=["*"], extra={"bell": False})
        surface = TerminalSurface(cfg)
        await surface.handle(_make_event())
        captured = capsys.readouterr()
        assert "Surface Test" in captured.out
        assert "reminder.created" in captured.out


@pytest.mark.asyncio
class TestDesktopNotificationSurface:
    async def test_calls_notify_send(self) -> None:
        from reminder_sync.surfaces.desktop import DesktopNotificationSurface

        cfg = SurfaceConfig(enabled=True, events=["*"])
        surface = DesktopNotificationSurface(cfg)

        mock_proc = AsyncMock()
        mock_proc.returncode = 0
        mock_proc.communicate = AsyncMock(return_value=(b"", b""))

        with patch("asyncio.create_subprocess_exec", return_value=mock_proc) as mock_exec:
            await surface.handle(_make_event())
            mock_exec.assert_called_once()
            args = mock_exec.call_args[0]
            assert args[0] == "notify-send"
            assert "Surface Test" in args[1]


@pytest.mark.asyncio
class TestWebhookSurface:
    async def test_posts_json(self) -> None:
        from reminder_sync.surfaces.webhook import WebhookSurface

        cfg = SurfaceConfig(enabled=True, events=["*"], extra={"url": "http://example.com/hook"})
        surface = WebhookSurface(cfg)

        mock_client = AsyncMock()
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_client.post = AsyncMock(return_value=mock_resp)
        surface._client = mock_client

        await surface.handle(_make_event())
        mock_client.post.assert_called_once()
        call_kwargs = mock_client.post.call_args
        assert "example.com" in call_kwargs[0][0] or "example.com" in str(call_kwargs)


@pytest.mark.asyncio
class TestShellCommandSurface:
    async def test_executes_command(self) -> None:
        from reminder_sync.surfaces.shell_command import ShellCommandSurface

        cfg = SurfaceConfig(enabled=True, events=["*"], extra={"command": "echo test"})
        surface = ShellCommandSurface(cfg)

        mock_proc = AsyncMock()
        mock_proc.returncode = 0
        mock_proc.communicate = AsyncMock(return_value=(b"test\n", b""))

        with patch("asyncio.create_subprocess_shell", return_value=mock_proc) as mock_shell:
            await surface.handle(_make_event())
            mock_shell.assert_called_once()
            env = mock_shell.call_args[1]["env"]
            assert env["REMINDER_TITLE"] == "Surface Test"
            assert env["REMINDER_UID"] == "s-uid"


@pytest.mark.asyncio
class TestClaudeCodeLoopSurface:
    async def test_writes_prompt_file(self, tmp_path: Path) -> None:
        from reminder_sync.surfaces.claude_loop import ClaudeCodeLoopSurface

        cfg = SurfaceConfig(
            enabled=True,
            events=["*"],
            extra={
                "prompt_directory": str(tmp_path),
                "prompt_template": "Task: {title} Notes: {notes}",
            },
        )
        surface = ClaudeCodeLoopSurface(cfg)
        await surface.handle(_make_event())
        files = list(tmp_path.glob("reminder-*.md"))
        assert len(files) == 1
        content = files[0].read_text()
        assert "Surface Test" in content
        assert "test notes" in content


@pytest.mark.asyncio
class TestEmailSurface:
    async def test_sends_email(self) -> None:
        from reminder_sync.surfaces.email_surface import EmailSurface

        cfg = SurfaceConfig(
            enabled=True,
            events=["*"],
            extra={
                "smtp_host": "localhost",
                "smtp_port": 25,
                "from": "test@test.com",
                "to": "dest@test.com",
            },
        )
        surface = EmailSurface(cfg)

        with patch("smtplib.SMTP") as mock_smtp:
            mock_server = MagicMock()
            mock_smtp.return_value.__enter__ = MagicMock(return_value=mock_server)
            mock_smtp.return_value.__exit__ = MagicMock(return_value=False)
            await surface.handle(_make_event())
            mock_server.send_message.assert_called_once()


@pytest.mark.asyncio
class TestLogFileSurface:
    async def test_appends_jsonl(self, tmp_path: Path) -> None:
        from reminder_sync.surfaces.log_file import LogFileSurface

        log_path = tmp_path / "events.jsonl"
        cfg = SurfaceConfig(enabled=True, events=["*"], extra={"path": str(log_path)})
        surface = LogFileSurface(cfg)
        await surface.handle(_make_event())
        await surface.handle(_make_event())
        lines = log_path.read_text().strip().split("\n")
        assert len(lines) == 2
        data = json.loads(lines[0])
        assert data["type"] == "reminder.created"
        assert data["reminder"]["title"] == "Surface Test"
