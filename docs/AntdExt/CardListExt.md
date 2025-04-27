---
title: CardListExt 卡片列表
toc: menu
---

# CardListExt 卡片列表

## 组件介绍

CardListExt 是一个灵活的卡片列表容器组件，提供网格布局、分页功能和详情展示能力。它基于 Ant Design 的设计规范，支持自定义卡片内容和布局，并提供流畅的交互体验。

## 何时使用

- 需要以网格形式展示多个卡片内容
- 数据量较大需要分页展示时
- 需要展示卡片详情，并支持列表-详情联动交互
- 需要自定义卡片内容和布局时

## 代码演示

### 基础用法

展示基本的卡片列表，支持自定义列数和间距。

<code src="../../packages/antd-ext/examples/CardListExt"></code>

### 自定义布局

展示如何自定义卡片的内容和布局。

<code src="../../packages/antd-ext/examples/CardListExt/CustomLayout"></code>

### 卡片-详情联动

展示卡片列表与详情的联动效果，点击卡片可展示详细信息。

<code src="../../packages/antd-ext/examples/CardListExt/CardListDetail"></code>

## API

### CardListExt

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| dataSource | 列表数据源 | `any[]` | `[]` | 是 |
| columns | 列数 | `number` | `4` | 否 |
| rowGap | 行间距（单位：px） | `number` | `16` | 否 |
| columnGap | 列间距（单位：px） | `number` | `16` | 否 |
| renderItem | 自定义渲染列表项的方法 | `(item: any, index: number) => React.ReactNode` | - | 是 |
| renderDetail | 自定义渲染详情的方法 | `(item: any) => React.ReactNode` | - | 否 |
| pagination | 分页配置，设置 false 时不显示分页 | `false \| PaginationConfig` | - | 否 |
| className | 自定义 className | `string` | - | 否 |
| cardSelectedStyle | 选中卡片的样式 | `CSSProperties` | - | 否 |
| isCollapse | 再次点击卡片是否可折叠详情面板 | `boolean` | `false` | 否 |

### PaginationConfig

继承自 antd 的 [Pagination](https://ant.design/components/pagination-cn) 组件属性，并扩展了以下属性：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 分页器位置 | `'top' \| 'bottom' \| 'both'` | `'bottom'` |

## 注意事项

1. `renderItem` 和 `dataSource` 是必填属性
2. 启用 `renderDetail` 后，点击卡片可展示详情
3. 组件会自动计算卡片宽度，确保网格布局的响应式表现
4. 分页配置支持 Ant Design Pagination 的所有属性

## FAQ

### 如何控制卡片的具体宽度？

组件会根据容器宽度、列数（columns）和列间距（columnGap）自动计算卡片宽度。如需自定义宽度，可以通过 `renderItem` 返回的内容控制。

### 如何自定义卡片的交互效果？

可以通过 `renderItem` 方法返回自定义的 Card 组件，并设置相应的 props 来实现自定义交互效果。

### 详情展示的动画可以自定义吗？

详情展示使用了 CSS transition 实现动画效果，可以通过自定义 className 覆盖相关样式来修改动画效果。

### 如何自定义选中卡片的样式？

可以通过 `cardSelectedStyle` 属性直接传入 CSS 样式对象来自定义选中卡片的样式。

### 如何使用折叠面板功能？
默认是点击详情收缩图标折叠面板，设置 `isCollapse` 属性为 `true` 即可启用点击面板来展开或收起详情内容。
