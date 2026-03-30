import os
from pathlib import Path

import yaml

from reminder_sync.config import Config, load_config, _parse_config


class TestConfigParsing:
    def test_empty_config(self) -> None:
        cfg = _parse_config({})
        assert cfg.icloud.username == ""
        assert cfg.sync.interval_seconds == 60
        assert cfg.sync.due_soon_lookahead_minutes == 15
        assert cfg.surfaces == {}

    def test_full_config(self) -> None:
        raw = {
            "icloud": {"username": "test@icloud.com", "password_env": "MY_PW"},
            "sync": {
                "interval_seconds": 30,
                "reminder_lists": ["Work"],
                "due_soon_lookahead_minutes": 10,
            },
            "surfaces": {
                "terminal": {
                    "enabled": True,
                    "events": ["reminder.created"],
                    "bell": True,
                },
                "webhook": {
                    "enabled": False,
                    "events": ["*"],
                    "url": "http://example.com",
                },
            },
            "logging": {"level": "DEBUG", "file": "/tmp/test.log"},
        }
        cfg = _parse_config(raw)
        assert cfg.icloud.username == "test@icloud.com"
        assert cfg.sync.interval_seconds == 30
        assert cfg.sync.reminder_lists == ["Work"]
        assert cfg.surfaces["terminal"].enabled is True
        assert cfg.surfaces["terminal"].extra["bell"] is True
        assert cfg.surfaces["webhook"].enabled is False
        assert cfg.logging.level == "DEBUG"

    def test_surface_accepts_event(self) -> None:
        raw = {
            "surfaces": {
                "terminal": {
                    "enabled": True,
                    "events": ["reminder.created", "reminder.completed"],
                }
            }
        }
        cfg = _parse_config(raw)
        scfg = cfg.surfaces["terminal"]
        assert scfg.accepts_event("reminder.created") is True
        assert scfg.accepts_event("reminder.deleted") is False

    def test_wildcard_events(self) -> None:
        raw = {
            "surfaces": {
                "log_file": {"enabled": True, "events": ["*"]}
            }
        }
        cfg = _parse_config(raw)
        scfg = cfg.surfaces["log_file"]
        assert scfg.accepts_event("reminder.created") is True
        assert scfg.accepts_event("anything") is True

    def test_password_from_env(self) -> None:
        raw = {"icloud": {"username": "u", "password_env": "TEST_ICLOUD_PW"}}
        cfg = _parse_config(raw)
        os.environ["TEST_ICLOUD_PW"] = "secret123"
        try:
            assert cfg.icloud.get_password() == "secret123"
        finally:
            del os.environ["TEST_ICLOUD_PW"]

    def test_load_config_missing_file(self, tmp_path: Path) -> None:
        cfg = load_config(tmp_path / "nonexistent.yaml")
        assert isinstance(cfg, Config)

    def test_load_config_from_file(self, tmp_path: Path) -> None:
        config_data = {
            "icloud": {"username": "file@icloud.com"},
            "sync": {"interval_seconds": 120},
        }
        p = tmp_path / "config.yaml"
        p.write_text(yaml.dump(config_data))
        cfg = load_config(p)
        assert cfg.icloud.username == "file@icloud.com"
        assert cfg.sync.interval_seconds == 120
