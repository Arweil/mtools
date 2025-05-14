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
| autoSelectFirstMenuOnNavbar | 导航栏选中是否激活第一个子菜单 | boolean | false |
| className | 容器className | string | - |
| collapsible | 侧边栏是否可收起 | boolean | false |
| collapsedWidth | 侧边栏收缩宽度 | number | 62 |
| headerExtra | 顶部header右侧拓展内容 | React.ReactNode | - |
| headerContent | 自定义tabbar区域内容，不传展示默认tabbar | ReactNode | - |
| history | react-router的history对象(用于layout内部监听路由变化做菜单定位) | History | - |
| setTitle | 侧边栏上方logo设置 | (data: { collapsed: boolean }) => ReactNode | - |
| menu | 菜单数据，详见下方 MenuType 说明 | [MenuType](#menutype-说明) | - |
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

## MenuType 说明

`MenuType` 是对 antd Menu items 的扩展，支持递归结构，并增加了 `navigationMode` 字段用于控制菜单项的跳转方式。

```ts
export type NavigationMode = 'push' | 'open' | 'none';

export type MenuType = ({
  navigationMode?: NavigationMode; // 跳转方式，'push'（默认）、'open'（新窗口）、'none'（禁用）
  children?: MenuType;
} & ItemType)[];
```

- `push`：内部路由跳转（默认）
- `open`：新窗口打开
- `none`：禁用跳转，仅触发回调

**示例：**
```ts
const menu: MenuType = [
  { key: '/a', label: 'A' },
  { key: '/b', label: 'B', navigationMode: 'open' },
  { key: '/c', label: 'C', navigationMode: 'none' }
];
```

[1]: https://ant-design.antgroup.com/components/menu-cn#itemtype
