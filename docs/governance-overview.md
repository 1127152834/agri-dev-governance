# 治理总览

## 1. 当前目标

本仓库用于承载智慧农业团队的组织级开发治理底座。目标不是放业务代码，而是统一：

- 团队开发流程
- Skill 工作流
- 文档目录结构
- 任务池管理
- 提交与 PR 规范
- 状态同步与追溯

## 2. 当前已并入主分支的治理能力

### 2.1 流程可视化

- `docs/development-lifecycle.html`
- `docs/development-lifecycle.css`
- `docs/development-lifecycle-x6.js`

作用：

- 向开发者展示完整开发闭环
- 说明主流程与异常回流
- 为后续 Skill 映射提供视觉入口

### 2.2 成员初始化

- `docs/member-init.md`
- `skills/member-init/SKILL.md`
- `templates/member/`

作用：

- 初始化成员资料
- 初始化状态面板
- 初始化任务容器
- 初始化日报目录

### 2.3 开发总门禁

- `docs/team-dev-spec.md`
- `skills/team-dev-spec/SKILL.md`

作用：

- 判断当前任务所处阶段
- 检查进入下一阶段的门禁条件
- 指引下一步应调用的 Skill

### 2.4 任务池管理

- `docs/task-pool-manager.md`
- `docs/task-lifecycle.md`
- `skills/task-pool-manager/SKILL.md`
- `templates/task-pool/`

作用：

- 发布任务
- 指派任务
- 维护任务池生命周期
- 维护任务日志

### 2.5 任务认领

- `docs/task-claim.md`
- `skills/task-claim/SKILL.md`

作用：

- 将任务从任务池同步到成员视图
- 更新 `tasks.md`
- 更新 `status.md`
- 创建模块文档入口

### 2.6 提交与 PR 规范

- `docs/commit-pr-spec.md`
- `skills/commit-pr-spec/SKILL.md`
- `templates/commit-pr/`

作用：

- 统一 commit message
- 统一 PR 描述
- 强制测试证明、风险说明、回滚说明

### 2.7 状态同步

- `docs/task-status-sync.md`
- `skills/task-status-sync/SKILL.md`

作用：

- 对齐任务池状态
- 对齐成员 `tasks.md`
- 对齐成员 `status.md`
- 对齐模块文档状态

## 3. 角色分工

### 项目经理

- 拆分任务
- 发布任务
- 指派任务
- 维护任务池生命周期

### 开发人员

- 初始化成员资料
- 认领任务
- 按阶段生成需求、设计、计划、实现、测试文档
- 按规范提交 commit 与 PR

### AI 助手

- 作为 Skill 执行器协助成员落地流程
- 生成或修正文档
- 执行流程检查与状态同步

## 4. 推荐调用顺序

### 新成员加入

1. `member-init`
2. 阅读 `development-lifecycle.html`
3. 阅读 `engineering-handbook.md`

### 新任务进入

1. `task-pool-manager`
2. `task-claim`
3. `team-dev-spec`
4. 后续进入设计、计划、开发、测试、提交流程

### 任务状态变化后

1. `task-status-sync`

### 提交前

1. `commit-pr-spec`

## 5. 目录结构总览

### 6.1 规范文档

- `docs/`

### 6.2 Skill

- `skills/`

### 6.3 模板

- `templates/member/`
- `templates/task-pool/`
- `templates/commit-pr/`

## 6. 当前治理链路闭环

当前已经形成以下闭环：

`成员初始化 -> 任务池发布/指派 -> 任务认领 -> 开发门禁 -> 状态同步 -> 提交与 PR 门禁`

如果后续再补日报或总览入口，这条链路会更完整。

## 7. 后续优先级建议

推荐后续按以下顺序推进：

1. 补 `daily-report` 或日报归档流程
2. 视需要补项目初始化或总控脚本
3. 清理历史 worktree 与遗留分支
