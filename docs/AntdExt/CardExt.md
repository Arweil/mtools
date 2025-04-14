---
title: CardExt
toc: menu
---
# CardExt 卡片

基于 antd Card 组件的扩展，提供更多实用功能。

## 特性

- 支持内容区域滚动
- 支持自定义内容区域高度
- 支持悬浮效果
- 支持自定义底部区域
- 支持自定义标题图标和额外文本
- 支持底部标签展示
- 继承 antd Card 的所有功能（除 extra 属性）

## 代码演示

### 基础用法

<code src="../../packages/antd-ext/examples/CardExt/index.tsx"></code>

## API

### CardExt

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义 className | string | - |
| style | 自定义样式 | CSSProperties | - |
| title | 卡片标题 | ReactNode | - |
| bordered | 是否有边框 | boolean | true |
| headStyle | 自定义标题区域样式 | CSSProperties | - |
| bodyStyle | 内容区域自定义样式 | CSSProperties | - |
| styles | 自定义卡片各区域样式 | Record<string, CSSProperties> | - |
| scrollable | 内容区域是否可滚动 | boolean | false |
| contentHeight | 内容区域高度 | number \| string | - |
| hoverable | 是否显示悬浮效果 | boolean | false |
| footer | 自定义底部内容 | ReactNode | - |
| footerStyle | 底部样式 | CSSProperties | - |
| titleIcon | 标题前的图标 | string | - |
| textExtra | 标题右侧的额外文本 | ReactNode | - |
| headTitleClassName | 标题样式 | string | - |
| footerLabels | 底部标签列表 | FooterLabel[] | - |
| footerLabelRight | 底部标签右侧内容 | ReactNode | - |

除了以上 API，CardExt 还支持所有 antd Card 组件的属性（除了 type 和 extra 属性）。

### FooterLabel

| 参数 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| icon | 标签图标URL | string | 是 |
| label | 标签文本 | string | 是 |

### 使用说明

1. **标题区域**
   - 使用 `titleIcon` 添加标题前的图标
   - 使用 `textExtra` 添加标题右侧的额外内容
   - 使用 `headTitleClassName` 自定义标题样式

2. **内容区域**
   - 设置 `scrollable` 使内容可滚动
   - 使用 `contentHeight` 控制内容区域高度
   - `contentHeight` 支持数字（单位：px）或字符串（如：'100%'）

3. **底部区域**
   - 使用 `footer` 自定义底部内容
   - `footerStyle` 自定义底部区域样式
   - 底部区域会自动应用卡片主题样式

4. **底部标签**
   - 使用 `footerLabels` 添加底部标签列表
   - 每个标签支持图标和文本
   - 使用 `footerLabelRight` 自定义标签右侧内容

5. **其他功能**
   - `hoverable` 控制鼠标悬浮效果
   - 支持所有 antd Card 的属性（除了 type 和 extra）
   - 图片加载失败时会自动隐藏

### 注意事项

1. `contentHeight` 必须是正数或非空字符串
2. `titleIcon` 和标签的 `icon` 必须是有效的图片URL
3. 标签的 `label` 不能为空
4. 图片加载失败时会自动隐藏，不会影响布局
5. 当同时使用 `footer` 和 `footerLabels` 时，`footerLabels` 会显示在 `footer` 的下方
6. 不支持 antd Card 的 `extra` 属性，请使用 `textExtra` 代替
