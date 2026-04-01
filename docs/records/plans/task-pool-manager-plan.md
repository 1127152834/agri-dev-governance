# task-pool-manager 实施计划

## 1. 目标

为治理仓库补齐任务池管理规范和 `task-pool-manager` Skill，使项目经理能够按统一结构发布、指派和流转任务。

## 2. 任务拆解

### 任务一：补齐设计文档

- 定义职责边界、生命周期和目录结构。

### 任务二：编写任务池规范文档

- 新建 `docs/workflows/task-pool-manager.md`
- 新建 `docs/workflows/task-lifecycle.md`

### 任务三：创建任务池模板

- 创建 `templates/task-pool/` 下的任务模板、索引模板和日志模板。

### 任务四：编写 Skill

- 完成 `skills/task-pool-manager/SKILL.md`
- 如有必要，补 `references/lifecycle-states.md`

### 任务五：验证与提交

- 运行 skill 校验脚本
- 检查规范与模板的一致性
- 提交当前改动
