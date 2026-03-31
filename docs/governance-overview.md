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

### 2.3 任务池管理

- `docs/task-pool-manager.md`
- `docs/task-lifecycle.md`
- `skills/task-pool-manager/SKILL.md`
- `templates/task-pool/`

作用：

- 发布任务
- 指派任务
- 维护任务池生命周期
- 维护任务日志

### 2.4 任务认领

- `docs/task-claim.md`
- `skills/task-claim/SKILL.md`

作用：

- 将任务从任务池同步到成员视图
- 更新 `tasks.md`
- 更新 `status.md`
- 创建模块文档入口

### 2.5 提交与 PR 规范

- `docs/commit-pr-spec.md`
- `skills/commit-pr-spec/SKILL.md`
- `templates/commit-pr/`

作用：

- 统一 commit message
- 统一 PR 描述
- 强制测试证明、风险说明、回滚说明

### 2.6 状态同步

- `docs/task-status-sync.md`
- `skills/task-status-sync/SKILL.md`

作用：

- 对齐任务池状态
- 对齐成员 `tasks.md`
- 对齐成员 `status.md`
- 对齐模块文档状态

## 3. 当前已完成但未并入主分支的能力

以下内容已在独立 worktree 中完成，但当前尚未并入主分支：

- `team-dev-spec`

建议后续尽快合并，因为它是所有开发前的总入口门禁。

## 4. 角色分工

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

## 5. 推荐调用顺序

### 新成员加入

1. `member-init`
2. 阅读 `development-lifecycle.html`
3. 阅读 `engineering-handbook.md`

### 新任务进入

1. `task-pool-manager`
2. `task-claim`
3. `team-dev-spec`（待合并）
4. 后续进入设计、计划、开发、测试、提交流程

### 任务状态变化后

1. `task-status-sync`

### 提交前

1. `commit-pr-spec`

## 6. 目录结构总览

### 6.1 规范文档

- `docs/`

### 6.2 Skill

- `skills/`

### 6.3 模板

- `templates/member/`
- `templates/task-pool/`
- `templates/commit-pr/`

## 7. 当前治理链路闭环

当前已经形成以下闭环：

`成员初始化 -> 任务池发布/指派 -> 任务认领 -> 状态同步 -> 提交与 PR 门禁`

如果后续把 `team-dev-spec` 合并，再补日报或总览入口，这条链路会更完整。

## 8. 后续优先级建议

推荐后续按以下顺序推进：

1. 合并 `team-dev-spec`
2. 补 `daily-report` 或日报归档流程
3. 视需要补项目初始化或总控脚本
