# project-bootstrap 设计文档

## 1. 目标

为新项目仓库提供统一初始化入口，一次性铺设项目级治理目录、基础文档、任务池目录、PR 模板入口和项目级 `AGENTS.md`，使项目仓库从第一天就能按团队治理流程运行。

## 2. 边界

`project-bootstrap` 只负责初始化项目仓库治理底座，不负责成员初始化和真实任务内容。

它负责：

- 初始化项目级 `docs/`
- 初始化项目级 `task-pool/`
- 初始化项目级引导文档
- 初始化项目级 `AGENTS.md`
- 初始化项目级 `.github/pull_request_template.md`

它不负责：

- 初始化成员个人目录
- 创建真实任务
- 替代任务认领或开发流程

## 3. 输入

- 项目根目录
- 项目名称
- 项目说明
- 默认是否创建 `.github/`

## 4. 输出

- 项目级基础目录
- 项目级规范入口文件
- 可直接开始使用的任务池骨架

## 5. 依赖模板

- `templates/project/project-overview.md`
- `templates/project/project-agents.md`
- `templates/commit-pr/pr-template.md`
- `templates/task-pool/`

## 6. 执行策略

通过脚本直接生成目录和文件，避免每次手工重复搭结构。
