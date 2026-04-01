# task-pool-manager 设计文档

## 1. 目标

为团队提供统一的任务池管理 Skill，用于发布任务、指派任务、更新任务状态、记录任务日志，并维护任务生命周期的一致性。

## 2. 边界

`task-pool-manager` 负责管理任务池中的真实任务数据，不负责成员初始化和具体开发实现。

它负责：

- 创建任务池结构
- 发布任务到任务池
- 指派任务
- 更新任务状态
- 写入任务流转日志

它不负责：

- 初始化成员个人目录
- 替代成员认领或开发实现 Skill
- 删除任务历史

## 3. 核心原则

- 任务池中的任务不能因认领或指派而被删除，只能改变状态
- 所有关键流转动作必须写入日志
- 任务池是任务流转的主记录，成员目录只是个人视角索引

## 4. 初始化结构

```text
docs/
└── task-pool/
    ├── 00-draft/
    ├── 01-ready/
    ├── 02-assigned/
    ├── 03-in-progress/
    ├── 04-waiting-test/
    ├── 05-waiting-review/
    ├── 06-done/
    ├── 07-blocked/
    ├── 08-cancelled/
    ├── 99-archived/
    ├── task-index.md
    └── task-ledger.md
```

## 5. 输入

- 项目名
- 任务编号
- 任务标题
- 状态变更动作
- 指派人 / 认领人
- 备注说明

## 6. 输出

- 更新后的任务文件
- 更新后的任务索引
- 更新后的任务日志

## 7. 依赖模板

- `templates/task-pool/task.md`
- `templates/task-pool/task-index.md`
- `templates/task-pool/task-ledger.md`
