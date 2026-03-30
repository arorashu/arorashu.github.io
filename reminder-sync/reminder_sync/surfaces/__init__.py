from .base import Surface
from .desktop import DesktopNotificationSurface
from .terminal import TerminalSurface
from .webhook import WebhookSurface
from .shell_command import ShellCommandSurface
from .claude_loop import ClaudeCodeLoopSurface
from .email_surface import EmailSurface
from .log_file import LogFileSurface

SURFACE_REGISTRY: dict[str, type[Surface]] = {
    "desktop_notification": DesktopNotificationSurface,
    "terminal": TerminalSurface,
    "webhook": WebhookSurface,
    "shell_command": ShellCommandSurface,
    "claude_code_loop": ClaudeCodeLoopSurface,
    "email": EmailSurface,
    "log_file": LogFileSurface,
}

__all__ = [
    "Surface",
    "SURFACE_REGISTRY",
    "DesktopNotificationSurface",
    "TerminalSurface",
    "WebhookSurface",
    "ShellCommandSurface",
    "ClaudeCodeLoopSurface",
    "EmailSurface",
    "LogFileSurface",
]
