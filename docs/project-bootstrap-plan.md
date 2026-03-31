# project-bootstrap 实施计划

## 1. 目标

为治理仓库补齐 `project-bootstrap` Skill、项目模板和初始化脚本，使新项目仓库能快速套入团队治理底座。

## 2. 任务拆解

### 任务一：补齐设计文档

- 定义职责边界、输入输出和模板依赖。

### 任务二：编写项目初始化规范文档

- 新建 `docs/project-bootstrap.md`
- 定义初始化目标结构和输出文件。

### 任务三：创建项目模板

- 创建 `templates/project/` 下的项目模板。

### 任务四：编写初始化脚本

- 在 `skills/project-bootstrap/scripts/` 下提供可执行脚本。

### 任务五：编写 Skill

- 完成 `skills/project-bootstrap/SKILL.md`
- 引导优先执行脚本。

### 任务六：验证与提交

- 实际运行脚本做一次沙盒验证
- 运行 skill 校验脚本
- 提交当前改动
