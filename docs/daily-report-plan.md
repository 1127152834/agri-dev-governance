# daily-report 实施计划

## 1. 目标

为治理仓库补齐 `daily-report` Skill、日报规范文档、模板与草稿生成脚本，使成员个人日报可以按统一路径和格式生成。

## 2. 任务拆解

### 任务一：补齐设计文档

- 定义输入来源、输出路径、边界和生成逻辑。

### 任务二：编写日报规范文档

- 新建 `docs/daily-report.md`
- 定义个人日报路径、字段和使用方式。

### 任务三：创建日报模板

- 创建 `templates/member/daily-report.md`

### 任务四：编写生成脚本

- 在 `skills/daily-report/scripts/` 下提供日报草稿生成脚本。

### 任务五：编写 Skill

- 完成 `skills/daily-report/SKILL.md`
- 补充引用说明。

### 任务六：验证与提交

- 实测脚本生成日报草稿
- 运行 skill 校验脚本
- 提交当前改动
