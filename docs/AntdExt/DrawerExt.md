---
title: DrawerExt
order: 6
toc: menu
---

# DrawerExt

## 示例
<code src="../../packages/antd-ext/examples/DrawerExt"></code>

## 逻辑拓展
在原有的 Drawer 基础上拓展了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| cancelText | 取消按钮文案 | string | "取消" | 0.1.0-alpha.0 |
| cancelButtonProps | 取消按钮属性 | ButtonExtProps | - | 0.1.0-alpha.0 |
| onCancel | 取消按钮文案 | 点击取消或者关闭，点击遮罩关闭弹窗触发 | () => void | 0.1.0-alpha.0 |
| okText | 确定按钮文案 | string | "确定" | 0.1.0-alpha.0 |
| okButtonProps | 确定按钮属性 | ButtonExtProps | - | 0.1.0-alpha.0 |
| onOk | 点击确认触发 | () => void | - | 0.1.0-alpha.0 |
| <del>onClose<del> | 原属性移除，使用onCancel替代 | - | - | 0.1.0-alpha.0 |

