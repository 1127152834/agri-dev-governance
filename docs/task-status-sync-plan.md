# task-status-sync 实施计划

## 1. 目标

为治理仓库补齐 `task-status-sync` Skill 和状态同步规范，使团队可以对齐任务池、成员面板和模块文档中的状态。

## 2. 任务拆解

### 任务一：补齐设计文档

- 定义同步边界、主记录原则与冲突处理规则。

### 任务二：编写状态同步规范文档

- 新建 `docs/task-status-sync.md`
- 明确主记录、派生视图、同步范围和冲突处理策略。

### 任务三：编写 Skill

- 完成 `skills/task-status-sync/SKILL.md`
- 补充 `references/conflict-resolution.md`

### 任务四：验证与提交

- 运行 skill 校验脚本
- 检查与 `task-pool-manager`、`task-claim` 的边界是否冲突
- 提交当前改动
