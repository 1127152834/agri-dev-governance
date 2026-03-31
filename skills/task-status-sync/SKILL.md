---
name: task-status-sync
description: 同步任务池、成员任务面板、成员状态面板与模块文档状态，并修正状态不一致。适用于任务阶段流转后、成员视图与任务池视图不一致时、或需要批量对齐任务状态时。
---

# Task Status Sync

## Overview

在任务状态发生流转后，使用本 Skill 将任务池、成员目录和模块文档入口的状态对齐起来，避免同一任务在不同视图中状态不一致。

本 Skill 不发布任务，也不执行任务认领，只负责对齐状态。

## Required Inputs

至少检查以下信息：

- 任务编号
- 任务池状态
- 成员 `tasks.md` 状态
- 成员 `status.md` 状态
- 模块文档目录状态

## Rules

- 默认以任务池状态为准
- 成员目录和模块文档目录是派生视图
- 同步前先识别冲突项
- 无法确认主记录时，不要擅自同步

## Conflict Resolution

需要详细冲突处理时，读取 `references/conflict-resolution.md`。

## Output Requirements

输出必须明确包含：

- 发现了哪些不一致
- 以什么状态为准
- 修正了哪些文件
- 是否存在待人工确认的冲突
