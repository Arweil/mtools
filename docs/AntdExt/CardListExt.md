---
title: CardListExt
toc: menu
---

# CardListExt 卡片列表

展示卡片列表的容器组件，支持网格布局和分页功能。

## 何时使用

- 需要以网格形式展示多个卡片时
- 需要对卡片列表进行分页展示时
- 需要自定义卡片内容和布局时

## 代码演示

### 基础用法

<code src="../../packages/antd-ext/examples/CardListExt"></code>

### 自定义布局

<code src="../../packages/antd-ext/examples/CardListExt/CustomLayout"></code>

### 卡片详情联动

<code src="../../packages/antd-ext/examples/CardListExt/CardListDetail"></code>

## API

### CardListExt

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据数组 | `any[]` | `[]` |
| columns | 列数 | `number` | `4` |
| rowGap | 行间距（单位：px） | `number` | `16` |
| columnGap | 列间距（单位：px） | `number` | `16` |
| cardProps | 卡片属性，同 antd Card 组件 | `CardProps` | `{ hoverable: true, bordered: true }` |
| renderItem | 自定义渲染每个卡片的方法 | `(item: any, index: number) => React.ReactNode` | - |
| pagination | 分页配置，设置 false 时不显示分页 | `false \| PaginationConfig` | - |

### PaginationConfig

继承自 antd 的 [Pagination](https://ant.design/components/pagination-cn) 组件属性，额外支持：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 分页器位置 | `'top' \| 'bottom' \| 'both'` | `'bottom'` |

## 主题配置

CardListExt 组件使用 antd v5 的 Design Token 进行样式开发，支持主题定制。 
