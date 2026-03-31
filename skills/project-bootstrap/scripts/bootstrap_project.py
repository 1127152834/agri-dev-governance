#!/usr/bin/env python3

from __future__ import annotations

import argparse
from pathlib import Path


TASK_POOL_DIRS = [
    "00-draft",
    "01-ready",
    "02-assigned",
    "03-in-progress",
    "04-waiting-test",
    "05-waiting-review",
    "06-done",
    "07-blocked",
    "08-cancelled",
    "99-archived",
]


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def write_if_missing(path: Path, content: str) -> None:
    if path.exists():
        return
    path.write_text(content, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Bootstrap project governance structure.")
    parser.add_argument("project_root", help="项目仓库根目录")
    parser.add_argument("--project-name", required=True, help="项目名称")
    parser.add_argument("--project-description", default="", help="项目说明")
    args = parser.parse_args()

    root = Path(args.project_root).expanduser().resolve()
    docs_dir = root / "docs"
    task_pool_dir = docs_dir / "task-pool"
    members_dir = docs_dir / "members"
    github_dir = root / ".github"

    ensure_dir(docs_dir)
    ensure_dir(members_dir)
    ensure_dir(task_pool_dir)
    ensure_dir(github_dir)

    for item in TASK_POOL_DIRS:
        ensure_dir(task_pool_dir / item)

    write_if_missing(
        root / "AGENTS.md",
        (
            "回答必须使用中文。\n\n"
            "本项目仓库接入组织级工程治理规则。\n\n"
            "## 开发前要求\n\n"
            "- 开发前先阅读团队开发规范\n"
            "- 按要求维护项目级任务池\n"
            "- 按要求维护成员目录和模块文档\n"
            "- 按提交与 PR 规范交付代码\n"
        ),
    )

    write_if_missing(
        docs_dir / "project-overview.md",
        (
            "# 项目总览\n\n"
            f"- 项目名称：{args.project_name}\n"
            f"- 项目说明：{args.project_description}\n"
            "- 主要模块：\n"
            "- 负责团队：\n"
            "- 仓库地址：\n"
        ),
    )

    write_if_missing(
        task_pool_dir / "task-index.md",
        "# 任务总览\n\n## 草稿\n\n- 暂无\n",
    )
    write_if_missing(
        task_pool_dir / "task-ledger.md",
        "# 任务流转日志\n\n| 时间 | 任务编号 | 动作 | 执行人 | 说明 |\n|------|----------|------|--------|------|\n",
    )
    write_if_missing(
        github_dir / "pull_request_template.md",
        (
            "## 改动摘要\n\n- \n\n"
            "## 关联模块\n\n- \n\n"
            "## 关联文档\n\n- \n\n"
            "## 测试证明\n\n- \n\n"
            "## 风险说明\n\n- \n\n"
            "## 回滚说明\n\n- \n"
        ),
    )

    print(f"已初始化项目治理结构: {root}")
    print(f"- docs: {docs_dir}")
    print(f"- task-pool: {task_pool_dir}")
    print(f"- members: {members_dir}")
    print(f"- .github: {github_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
