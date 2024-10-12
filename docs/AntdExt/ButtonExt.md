---
title: ButtonExt
toc: menu
---

# ButtonExt

## 示例
<code src="../../packages/antd-ext/examples/ButtonExt"></code>

## 逻辑拓展
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| isAsyncClick | 如果onClick是异步方法，会自带loading效果 | boolean | false | 0.0.1-alpha.0 |
| debounce | click回调事件防抖，传入true时默认300ms延迟 | boolean \| number | - | 1.2.0 |

> 在使用 isAsyncClick 时，onClick 事件必须为异步函数，否则 loading 无效
