---
title: Button
order: 0
toc: menu
---

## 基础按钮

<code src="../../examples/Button/index.tsx"></code>

## 不同样式的按钮

<code src="../../examples/Button/themes.tsx"></code>

## 带 loading 的按钮

```tsx
import React from 'react';
import { ButtonExt } from 'antd-ext';

export default () => (
  <ButtonExt isAsyncClick onClick={() => new Promise(r => setTimeout(r, 1000))}>
    Hello antd-ext
  </ButtonExt>
);
```

## API
通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled。 按钮的属性说明如下：


| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false |
| danger | 设置危险按钮 | boolean | false |
| disabled | 按钮失效状态 | boolean | false |
| ghost | 幽灵属性，使按钮背景透明 | boolean | false |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | \- |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |
| icon | 设置按钮的图标组件 | ReactNode | \- |
| loading | 设置按钮载入状态 | boolean | { delay: number } | false |
| shape | 设置按钮形状 | `default` | `circle` | `round` | 'default' |
| size | 设置按钮大小 | `large` | `middle` | `small` | `middle` |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | \- |
| type | 设置按钮类型 | `primary` | `ghost` | `dashed` | `link` | `text` | `default` | `default` |
| onClick | 点击按钮时的回调 | (event) => void | \- |
