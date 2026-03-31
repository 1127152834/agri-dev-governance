---
name: member-init
description: 初始化团队成员的个人资料、状态面板、任务容器、日报目录与基础归档结构。适用于成员首次加入项目、开始使用团队开发规范、或需要补齐个人工作区文档结构时。
---

# Member Init

## Overview

在成员首次加入项目时，先使用本 Skill 初始化成员目录和基础文档结构，为后续任务认领、状态同步和日报归档提供统一落点。

本 Skill 只初始化容器和模板，不创建真实任务内容。

## Initialization Scope

默认初始化以下内容：

- `docs/成员名/profile.md`
- `docs/成员名/status.md`
- `docs/成员名/tasks.md`
- `docs/成员名/tasks/`
- `docs/成员名/reports/daily/README.md`

需要完整结构时，读取 `references/output-structure.md`。

## Required Inputs

至少收集以下信息：

- 成员姓名
- 角色
- Git 用户名
- 负责仓库
- 负责模块
- 技能方向

## Rules

- 只初始化成员目录和模板文件
- 不创建真实任务内容
- 不代替任务认领流程
- 目录名统一使用成员姓名

## Output Requirements

输出必须明确包含：

- 初始化的目录路径
- 创建了哪些文件
- 哪些字段需要成员补充
