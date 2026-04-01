# team-dev-spec 设计文档

## 1. 目标

定义团队开发总入口 Skill，用于在任何开发动作前检查当前任务是否满足进入下一阶段的前置条件，并根据任务所处阶段分流到合适的下游 Skill。

## 2. 边界

`team-dev-spec` 是门禁 Skill，不是产出 Skill。

它负责：

- 检查当前任务处于哪个阶段
- 检查是否满足阶段门禁
- 提示缺失文档、缺失前置条件
- 指引下一步应该调用哪个 Skill

它不负责：

- 直接代替产品设计、实施计划、开发实现、测试报告等专项 Skill
- 直接创建或修改所有文档
- 直接执行代码实现

## 3. 输入

- 成员名
- 仓库名
- 模块名
- 当前任务或目标
- 当前已有文档
- 当前任务状态

## 4. 输出

- 当前阶段判断
- 是否满足门禁
- 缺失项清单
- 下一步推荐 Skill
- 推荐文档路径
- 禁止事项提醒

## 5. 依赖文档

- `docs/overview/overview/engineering-handbook.md`
- `docs/overview/workflow-overview.md`
- `docs/visuals/development-lifecycle/index.html`
- `docs/workflows/team-dev-spec.md`

## 6. 阶段分流

- 需求说明：`product-strategist`
- 产品设计：`product-strategist` / `product-designer`
- 实施计划：`writing-plans`
- worktree：`using-git-worktrees`
- 开发实现：`test-driven-development`
- 测试验证：`verification-before-completion`
- 提交与 PR：`commit-pr-spec`

## 7. 强制原则

- 未形成需求说明，不允许进入开发实现
- 未形成实施计划，不允许进入编码
- 未通过测试验证，不允许进入提交与 PR
- 未使用独立 worktree，不允许开始正式开发
