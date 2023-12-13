---
title: TableExt
toc: menu
---

# TableExt

## 示例

<code src="../../packages/antd-ext/examples/TableExt/base"></code>

<code src="../../packages/antd-ext/examples/TableExt/customPageSizeOptions"></code>

<code src="../../packages/antd-ext/examples/TableExt/columnsGroup"></code>

## 逻辑拓展
在原有的Table基础上拓展了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| useSkeleton | 首屏展示骨架屏，状态会从loading同步，所以需要和loading属性一起使用 | boolean | - | 0.0.1-alpha.4 |
| emptyDesc | 没有数据展示的文案 | string | "没有数据" | 0.0.1-alpha.4 |
| useEmpty | 没有数据始终显示“没有数据”的样式 | boolean | false | 0.6.4-alpha.0 |

在原有的列属性上拓展了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| useDefaultRender | 是否使用TableExt处理过的列render。 | boolean | - | 0.0.1-alpha.4 |
| hidden | 是否隐藏列 | boolean | - | 0.0.1-alpha.4 |

新增了一些交互：
1. 表格中的内容最多展示两行，超出两行的内容会展示省略号（...），hover状态下会展示tooltip，显示全部内容。
2. 分页逻辑：总条数超过10条，显示分页器，不超过10条隐藏分页器，pagination为 false 不启用分页。比如：总条数11条，显示分页器，页尺寸调整为20，依旧显示分页器。
3. 启用骨架屏 { useSkeleton: true }后，*只有第一屏才会展示骨架屏*，后续的分页请求使用的是loading，而不是骨架屏。骨架屏覆盖：行选择器，列标题，表格内容。
4. 启用骨架屏后，没有数据的状态为不展示列标题；不启用骨架屏，使用原始的antd的没有数据的行为。
