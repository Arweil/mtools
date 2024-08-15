---
title: NotificationExt
toc: menu
---

# NotificationExt

## 示例

<code src="../../packages/antd-ext/examples/NotificationExt/hooks.tsx">Hooks调用</code>

<code src="../../packages/antd-ext/examples/NotificationExt/static.tsx">静态方法调用</code>


## 逻辑拓展
在原有的Notification基础上拓展了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| ~~setTheme~~ | (theme: Theme) => void | boolean | - | <font color="red"><b>已废弃</b></font> |

ArgsPropsExt 拓展了两个属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| needBtn | 是否需要“我知道了”按钮，点击后，关闭通知。如果没有按钮，默认3s关闭 | boolean | undefined | --- |
| ~~theme~~ | 主题，优先级高于setTheme | Theme | hermes | <font color="red"><b>已废弃</b></font> |
