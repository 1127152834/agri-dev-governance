---
name: team-dev-spec
description: 团队开发总入口规范，用于在任何开发动作前检查当前任务所处阶段、文档前置条件和流程门禁，并指引下一步应该调用的 Skill。适用于开始开发、切换任务、准备编码、准备提交、或不确定当前该走哪一步时。
---

# Team Dev Spec

## Overview

在开始任何需求分析、产品设计、实施计划、开发实现、测试验证、提交与评审动作前，先使用本 Skill 检查当前任务是否满足进入下一阶段的门禁。

本 Skill 只负责门禁检查和阶段分流，不负责代替下游 Skill 完成具体产出。

## Core Checks

至少检查以下信息：

- 成员名
- 模块名
- 当前任务状态
- 当前已有文档
- 当前希望执行的动作

## Stage Gates

### 需求说明前

- 任务必须已认领或已指派

### 产品设计前

- 必须已有 `01-需求说明.md`

### 实施计划前

- 必须已有 `02-产品设计.md`

### 开发实现前

- 必须已有 `03-实施计划.md`
- 必须已创建独立 worktree

### 提交与 PR 前

- 必须已有测试验证结果

## Stage Routing

需要详细阶段映射时，读取 `references/phase-routing.md`。

默认分流如下：

- 需求说明：`product-strategist`
- 产品设计：`product-strategist` / `product-designer`
- 实施计划：`writing-plans`
- 创建 worktree：`using-git-worktrees`
- 开发实现：`test-driven-development`
- 测试验证：`verification-before-completion`
- 提交与 PR：`commit-pr-spec`

## Prohibited Actions

- 不要在没有需求说明时直接进入开发实现
- 不要在没有实施计划时直接编码
- 不要在没有测试验证时直接提交流程
- 不要跳过文档链路直接宣称任务完成

## Output Requirements

输出必须明确包含：

- 当前阶段
- 缺失项
- 是否满足门禁
- 下一步推荐 Skill
- 对应文档路径
