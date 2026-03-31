---
name: daily-report
description: 读取成员状态与任务总表，生成成员个人日报草稿，并保留阻塞项与明日计划补充位。适用于每天结束时生成日报、补齐成员日报归档、或需要根据当前任务状态整理当日进展时。
---

# Daily Report

## Overview

在每天结束时，使用本 Skill 读取成员 `status.md` 与 `tasks.md`，生成个人日报草稿，并写入统一归档路径。

本 Skill 不生成周报或月报，也不直接修改任务池状态。

## Preferred Execution

优先执行 `scripts/generate_daily_report.py`。

示例：

```bash
python3 skills/daily-report/scripts/generate_daily_report.py docs/张三 --date 2026-04-01
```

## Output

推荐输出路径：

```text
docs/成员名/reports/daily/YYYY/YYYY-MM-DD.md
```

详细字段参考见 `references/report-fields.md`。

## Rules

- 优先读取 `status.md` 与 `tasks.md`
- 草稿生成后，成员仍需补充阻塞项与明日计划
- 不重复创建同一天多个日报文件

## Output Requirements

输出必须明确包含：

- 生成到哪个路径
- 从哪些文件读取了状态
- 哪些字段仍需成员补充
