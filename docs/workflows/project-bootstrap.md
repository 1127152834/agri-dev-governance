# 项目初始化规范

## 1. 定位

项目初始化规范用于为一个新的业务仓库快速铺设团队治理底座，使该仓库在创建之初就具备任务池、项目总览、规则入口和 PR 模板。

## 2. 推荐输出结构

```text
repo/
├── AGENTS.md
├── docs/
│   ├── project-overview.md
│   ├── members/
│   └── task-pool/
│       ├── 00-draft/
│       ├── 01-ready/
│       ├── 02-assigned/
│       ├── 03-in-progress/
│       ├── 04-waiting-test/
│       ├── 05-waiting-review/
│       ├── 06-done/
│       ├── 07-blocked/
│       ├── 08-cancelled/
│       ├── 99-archived/
│       ├── task-index.md
│       └── task-ledger.md
└── .github/
    └── pull_request_template.md
```

## 3. 初始化内容

- 项目总览文档
- 项目级 `AGENTS.md`
- 成员目录占位
- 任务池骨架
- PR 模板

## 4. 使用原则

- 每个新项目仓库只执行一次初始化
- 初始化完成后，再由 `member-init`、`task-pool-manager` 等 Skill 接管日常流程
- 初始化脚本不应覆盖已有业务文件
