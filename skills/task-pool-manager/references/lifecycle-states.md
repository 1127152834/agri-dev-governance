# 生命周期状态参考

## 目录映射

- `00-draft`：草稿
- `01-ready`：已发布
- `02-assigned`：已指派 / 已认领
- `03-in-progress`：开发中
- `04-waiting-test`：待测试
- `05-waiting-review`：待评审
- `06-done`：已完成
- `07-blocked`：已阻塞
- `08-cancelled`：已取消
- `99-archived`：已归档

## 规则

- 流转通过移动状态目录和记录日志完成
- 日志必须保留时间、动作、执行人和说明
- 不允许因认领、取消、完成而直接删除任务文件
