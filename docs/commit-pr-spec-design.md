# commit-pr-spec 设计文档

## 1. 目标

为团队提供统一的提交与 PR 规范 Skill，约束 commit message、PR 描述、测试证明、风险说明和回滚说明，避免多人协作下交付质量失控。

## 2. 边界

`commit-pr-spec` 是提交与评审前的门禁 Skill，不负责替代测试验证或代码评审本身。

它负责：

- 检查 commit message 是否合规
- 检查 PR 描述是否齐全
- 检查是否附带测试证明
- 检查是否说明风险和回滚点

它不负责：

- 直接执行测试
- 代替代码评审
- 替代开发实现

## 3. 输入

- commit message
- PR 标题
- PR 描述
- 测试报告链接或摘要
- 风险说明
- 回滚说明

## 4. 输出

- 是否符合提交规范
- 是否符合 PR 规范
- 缺失项清单
- 推荐修正项

## 5. 依赖模板

- `templates/commit-pr/commit-message.md`
- `templates/commit-pr/pr-template.md`

## 6. 强制原则

- 没有测试证明，不允许进入 PR
- 没有风险说明和回滚说明，不允许认为 PR 完整
- commit message 不合规，不允许提交
