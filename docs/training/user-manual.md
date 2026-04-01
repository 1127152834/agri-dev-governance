# 使用手册

## 1. 手册目标

本手册用于帮助项目经理、开发人员以及使用 Codex 的成员快速理解并使用当前治理仓库中的开发规范、Skill、模板和文档结构。

这不是制度文件的重复抄写，而是面向执行的共用手册。

## 2. 开始前先看什么

建议先阅读以下内容：

- `docs/overview/overview/governance-overview.md`
- `docs/visuals/development-lifecycle/index.html`
- `docs/overview/overview/engineering-handbook.md`

## 3. 角色分工

### 3.1 项目经理

项目经理负责：

- 拆分任务
- 发布任务
- 指派任务
- 维护任务池生命周期

常用能力：

- `project-bootstrap`
- `task-pool-manager`
- `task-status-sync`

### 3.2 开发人员

开发人员负责：

- 初始化成员资料
- 认领任务
- 生成需求、设计、计划、开发、测试文档
- 按提交规范提交代码
- 每日补齐日报

常用能力：

- `member-init`
- `task-claim`
- `team-dev-spec`
- `commit-pr-spec`
- `daily-report`

### 3.3 AI 助手 / 使用 Codex 的成员

AI 助手负责：

- 作为 Skill 执行器协助落地流程
- 生成或修正文档
- 检查门禁
- 同步状态

## 4. 标准工作流

### 4.1 新项目初始化

使用：

- `project-bootstrap`

目标：

- 为新项目仓库创建项目总览、任务池目录、项目级 `AGENTS.md` 和 PR 模板。

### 4.2 新成员加入

使用：

- `member-init`

目标：

- 初始化成员目录、个人资料、状态面板、任务总表和日报目录。

### 4.3 新任务进入

使用：

- `task-pool-manager`

目标：

- 将任务发布到任务池并维护生命周期。

### 4.4 开发人员认领任务

使用：

- `task-claim`

目标：

- 把任务同步到成员 `tasks.md`、`status.md` 和模块目录入口。

### 4.5 开发前检查

使用：

- `team-dev-spec`

目标：

- 判断当前阶段
- 检查前置文档和门禁
- 指引下一步 Skill

### 4.6 任务状态变化后

使用：

- `task-status-sync`

目标：

- 对齐任务池、成员面板和模块文档状态。

### 4.7 提交前检查

使用：

- `commit-pr-spec`

目标：

- 检查 commit、PR、测试证明、风险说明和回滚说明。

### 4.8 每日收尾

使用：

- `daily-report`

目标：

- 读取成员 `tasks.md` 和 `status.md`
- 生成个人日报草稿

## 5. 常见场景操作指南

### 5.1 新建一个项目仓库

1. 在项目仓库根目录执行 `project-bootstrap`
2. 检查 `docs/project-overview.md`
3. 检查 `docs/task-pool/` 是否已生成
4. 检查 `.github/pull_request_template.md` 是否已生成

### 5.2 新成员第一次进入项目

1. 执行 `member-init`
2. 补全 `profile.md`
3. 检查 `status.md`、`tasks.md`、`reports/daily/README.md`

### 5.3 项目经理发布并指派任务

1. 使用 `task-pool-manager` 创建任务
2. 把任务放入 `01-ready/`
3. 指派后改到 `02-assigned/`
4. 追加 `task-ledger.md`

### 5.4 开发人员认领并开始开发

1. 使用 `task-claim`
2. 更新成员 `tasks.md`
3. 更新成员 `status.md`
4. 建立模块文档入口
5. 使用 `team-dev-spec` 检查是否满足进入需求 / 设计 / 实施计划阶段的门禁

### 5.5 开发完成后提交并补日报

1. 使用 `task-status-sync` 对齐当前状态
2. 使用 `commit-pr-spec` 检查交付门禁
3. 提交代码和 PR
4. 使用 `daily-report` 生成当日日报草稿

## 6. 目录与产物清单

### 6.1 成员目录

```text
docs/成员名/
├── profile.md
├── status.md
├── tasks.md
├── tasks/
└── reports/daily/
```

### 6.2 任务池目录

```text
docs/task-pool/
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

### 6.3 模板目录

- `templates/member/`
- `templates/task-pool/`
- `templates/commit-pr/`
- `templates/project/`

## 7. 常见错误

- 没做 `member-init` 就认领任务
- 没经过 `team-dev-spec` 就直接开始写代码
- 只改成员 `tasks.md`，不改任务池状态
- 没测试证明就发起 PR
- 只补日报，不同步 `status.md`

## 8. 快速指令示例

### 项目初始化

`使用 $project-bootstrap 为一个新项目仓库初始化治理目录和规则入口。`

### 成员初始化

`使用 $member-init 初始化当前成员的资料、任务状态文件和日报目录。`

### 任务池发布

`使用 $task-pool-manager 发布一个新的任务池任务，并写入任务日志。`

### 任务认领

`使用 $task-claim 认领任务池中的任务，并同步到当前成员目录。`

### 开发前检查

`使用 $team-dev-spec 检查我当前任务是否满足进入下一阶段的开发门禁。`

### 状态同步

`使用 $task-status-sync 同步任务池、成员目录和模块文档中的任务状态。`

### 提交与 PR 检查

`使用 $commit-pr-spec 检查我当前改动的 commit 和 PR 是否符合团队规范。`

### 每日日报

`使用 $daily-report 读取当前成员状态，生成当天的个人日报草稿。`
