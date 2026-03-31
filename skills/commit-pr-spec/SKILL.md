---
name: commit-pr-spec
description: 统一 commit、PR、测试证明、风险说明与回滚说明要求。适用于准备提交代码、发起 PR、检查 PR 描述是否完整、或需要确认交付前门禁是否满足时。
---

# Commit PR Spec

## Overview

在提交代码或发起 PR 前，使用本 Skill 检查当前交付是否满足团队的提交与评审门禁。

本 Skill 不执行测试，也不代替代码评审，只负责检查交付描述是否完整。

## Required Inputs

至少检查以下内容：

- commit message
- PR 标题
- PR 描述
- 测试证明
- 风险说明
- 回滚说明

## Rules

- commit message 必须清晰、可读
- PR 必须附带测试证明
- PR 必须说明风险和回滚方式
- 不要在一个 PR 里混入无关改动

## Checklist

需要详细检查项时，读取 `references/checklist.md`。

## Output Requirements

输出必须明确包含：

- commit 是否合规
- PR 是否完整
- 缺失项
- 修正建议
