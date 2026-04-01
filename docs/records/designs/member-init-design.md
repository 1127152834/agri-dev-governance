# member-init 设计文档

## 1. 目标

为团队成员提供统一的初始化入口，在项目仓库中建立成员资料、状态面板、任务容器和日报目录，使后续任务认领、开发执行、汇报归档都具备统一落点。

## 2. 边界

`member-init` 只负责初始化“人”和“容器”，不负责创建真实任务内容。

它负责：

- 初始化成员资料文档
- 初始化成员状态面板
- 初始化任务总表和任务记录目录
- 初始化日报归档目录和日报说明

它不负责：

- 创建具体任务
- 自动从任务池认领任务
- 直接进入开发流程

## 3. 初始化结果

默认初始化结构如下：

```text
docs/
└── 成员名/
    ├── profile.md
    ├── status.md
    ├── tasks.md
    ├── tasks/
    └── reports/
        └── daily/
            └── README.md
```

## 4. 输入

- 成员姓名
- 角色
- Git 用户名
- 负责仓库
- 负责模块
- 技能方向

## 5. 输出

- 标准成员目录
- 标准成员模板文件
- 可供后续 task-claim / daily-report 等 Skill 复用的容器结构

## 6. 依赖模板

- `templates/member/profile.md`
- `templates/member/status.md`
- `templates/member/tasks.md`
- `templates/member/daily-readme.md`

## 7. 强制原则

- 任何成员首次加入项目，必须先执行初始化
- 初始化后才能承接任务认领和状态同步
- 模板结构必须统一，避免个人自由发挥破坏团队可追溯性
