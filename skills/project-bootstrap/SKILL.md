---
name: project-bootstrap
description: 为新项目仓库铺设治理底座、目录结构、模板和规则入口。适用于初始化一个新的业务仓库、让该仓库接入团队开发治理体系、或为项目补齐任务池和项目级规则时。
---

# Project Bootstrap

## Overview

在一个新项目仓库开始正式开发前，使用本 Skill 初始化项目级治理骨架，使该仓库具备项目总览、任务池、成员目录占位、PR 模板和项目级 `AGENTS.md`。

本 Skill 不初始化成员个人资料，也不创建真实任务。

## Preferred Execution

优先执行 `scripts/bootstrap_project.py`。

示例：

```bash
python3 skills/project-bootstrap/scripts/bootstrap_project.py /path/to/repo \
  --project-name "项目名称" \
  --project-description "项目说明"
```

## Output

默认输出结构见 `references/output-structure.md`。

## Rules

- 不覆盖已有业务文件
- 初始化完成后，再交给 `member-init`、`task-pool-manager`、`task-claim` 等 Skill 使用
- 项目级 `AGENTS.md` 只放项目接入要求，不重复组织级长文档

## Output Requirements

输出必须明确包含：

- 初始化了哪些目录
- 创建了哪些文件
- 哪些文件仍需要项目负责人补充
