# commit-pr-spec 实施计划

## 1. 目标

为治理仓库补齐提交与 PR 规范文档、模板和 `commit-pr-spec` Skill，使提交和交付前门禁形成统一标准。

## 2. 任务拆解

### 任务一：补齐设计文档

- 定义边界、输入输出与门禁规则。

### 任务二：编写提交与 PR 规范文档

- 新建 `docs/workflows/commit-pr-spec.md`
- 定义 commit message 规范、PR 必填项、测试证明、风险说明、回滚说明。

### 任务三：创建模板

- 创建 `templates/commit-pr/` 下的 commit 和 PR 模板。

### 任务四：编写 Skill

- 完成 `skills/commit-pr-spec/SKILL.md`
- 如有必要，补参考文件。

### 任务五：验证与提交

- 运行 skill 校验脚本
- 检查文档、模板和 Skill 是否一致
- 提交当前改动
