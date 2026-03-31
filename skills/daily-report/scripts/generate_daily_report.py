#!/usr/bin/env python3

from __future__ import annotations

import argparse
from datetime import date
from pathlib import Path


def read_text(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def extract_bullets(section_title: str, content: str) -> list[str]:
    lines = content.splitlines()
    bullets: list[str] = []
    in_section = False
    for line in lines:
      if line.strip().startswith("## "):
          in_section = line.strip() == f"## {section_title}"
          continue
      if in_section and line.strip().startswith("- "):
          bullets.append(line.strip())
    return bullets


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate member daily report draft.")
    parser.add_argument("member_dir", help="成员目录，例如 docs/张三")
    parser.add_argument("--date", dest="report_date", default=str(date.today()), help="日报日期 YYYY-MM-DD")
    args = parser.parse_args()

    member_dir = Path(args.member_dir).expanduser().resolve()
    tasks_path = member_dir / "tasks.md"
    status_path = member_dir / "status.md"

    report_date = args.report_date
    year = report_date.split("-")[0]
    report_dir = member_dir / "reports" / "daily" / year
    report_dir.mkdir(parents=True, exist_ok=True)
    report_path = report_dir / f"{report_date}.md"

    tasks_content = read_text(tasks_path)
    status_content = read_text(status_path)

    completed = extract_bullets("已完成", tasks_content) or ["- 暂无"]
    in_progress = extract_bullets("进行中", tasks_content) or ["- 暂无"]

    blocked = []
    for line in status_content.splitlines():
        if line.startswith("- 阻塞项："):
            value = line.split("：", 1)[1].strip()
            blocked.append(f"- {value}" if value else "- 暂无")

    if not blocked:
        blocked = ["- 暂无"]

    current_task = []
    for line in status_content.splitlines():
        if line.startswith("- 当前主任务："):
            value = line.split("：", 1)[1].strip()
            current_task.append(f"- {value}" if value else "- 暂无")

    if not current_task:
        current_task = ["- 暂无"]

    report = "\n".join(
        [
            f"# {report_date} 日报",
            "",
            "## 今日完成",
            *completed,
            "",
            "## 进行中",
            *in_progress,
            "",
            "## 阻塞项",
            *blocked,
            "",
            "## 明日计划",
            "- 待补充",
            "",
            "## 关联任务 / 模块",
            *current_task,
            "",
        ]
    )

    report_path.write_text(report, encoding="utf-8")
    print(f"已生成日报草稿: {report_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
