---
title: LayoutExt
toc: menu
---

# LayoutExt

## 示例（zeus）
<code src="../../packages/antd-ext/examples/LayoutV2/zeus" iframe="500"></code>


## 示例（hermes）
<code src="../../packages/antd-ext/examples/LayoutV2/hermes.tsx" iframe="500"></code>

## 示例（BaseLayoutExt）
<code src="../../packages/antd-ext/examples/LayoutV2/BaseLayoutExt.tsx" iframe="500"></code>

## API

布局容器。
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器className | string | - |
| collapsible | 侧边栏是否可收起 | boolean | false |
| collapsedWidth | 侧边栏收缩宽度 | number | 62 |
| headerExtra | 顶部header右侧拓展内容 | React.ReactNode | - |
| headerContent | 自定义tabbar区域内容，不传展示默认tabbar | ReactNode | - |
| setTitle | 侧边栏上方logo设置 | (data: { collapsed: boolean }) => ReactNode | - |
| menu | 菜单，同antd Menu组件的items<br>key通常存储url | [ItemType[]][1] | - |
| onCollapse | 点击trigger的回调 | (collapsed: boolean; info: { type: CollapseType, siderWidth: number, collapsedWidth: number }) => void | - |
| onSelect | 菜单及tab选中时触发的回调 | (info: { key: string }) => void | - |
| siderWidth | 侧边栏宽度 | number | 134 |
| trigger | 自定义 trigger，设置为 null 时隐藏 trigger | (collapsed: boolean) => ReactNode | - |

## LayoutV2.useLayout

当你需要控制LayoutV2的状态，如：导航激活\菜单打开\菜单激活\tab等状态时，可以使用useLayout。

`LayoutV2.useLayout`返回一个对象，包含以下方法：

| 方法 | 说明 | 类型 |
| --- | --- | --- |
| activeNav | 设置导航激活的key | (key: string) => void |
| activeMenu | 设置菜单激活的key | (key: string) => void |
| setOpenKey | 设置菜单打开的key | (key: string) => void |
| addTab | 添加tab，入参为string时会从menu中查找<br>若不传递key信息，默认使用当前path信息 | (key?: string \| { key?: string, label: string }) => void |
| removeTab | 移除tab | (key: string) => void |



[1]: https://ant-design.antgroup.com/components/menu-cn#itemtype
