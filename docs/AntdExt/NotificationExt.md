---
title: NotificationExt
toc: menu
---

# NotificationExt

## 示例

<code src="../../packages/antd-ext/examples/NotificationExt/hooks.tsx">Hooks调用</code>

<code src="../../packages/antd-ext/examples/NotificationExt/api1.tsx">静态方法调用-config</code>

<code src="../../packages/antd-ext/examples/NotificationExt/api2.tsx">静态方法调用-holderRender</code>

## 逻辑拓展
在原有的Notification基础上拓展了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| setTheme | (theme: Theme) => void | boolean | - | - |

ArgsPropsExt 拓展了两个属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| theme | 主题，优先级高于setTheme | Theme | hermes | --- |
| needBtn | 是否需要“我知道了”按钮，点击后，关闭通知。如果没有按钮，默认3s关闭 | boolean | undefined | --- |
