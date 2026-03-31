# task-claim 实施计划

## 1. 目标

为治理仓库补齐 `task-claim` Skill 和任务认领规范，使开发人员可以从任务池认领任务，并同步到成员侧文档结构。

## 2. 任务拆解

### 任务一：补齐设计文档

- 定义职责边界、同步目标与成员侧更新范围。

### 任务二：编写任务认领规范文档

- 新建 `docs/task-claim.md`
- 定义认领步骤、同步动作与门禁条件。

### 任务三：编写 Skill

- 完成 `skills/task-claim/SKILL.md`
- 如有必要，补充 `references/member-sync.md`

### 任务四：验证与提交

- 运行 skill 校验脚本
- 检查与 `member-init`、`task-pool-manager` 的边界是否冲突
- 提交当前改动
