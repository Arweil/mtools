---
title: TreeExt
toc: menu
---

# TreeExt

## 示例
<code src="../../packages/antd-ext/examples/TreeExt"></code>

在原有的 Tree 基础上拓展了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| getNodeMore | 渲染右侧的下拉菜单选项 | (tdn: TreeDataNode) => DropDownProps | void | undefined | |
<!-- | multipleCheckbox | 多选时是否使用checkbox样式 | boolean | undefined | 0.7.0 | -->

<!-- ## 逻辑拓展
基于 ant-design 的 Tree 组件，修改了：
1. 重新设置了为空状态，通过 *notFoundContent* 属性
2. 为选项省略提供 tooltip 的展示。options 中的 *relLabel* 表示传入的 label 属性，label 属性会进行重写。
3. 新增了 *dataMap* 属性，可以传入对象进行数据绑定，对象键 等价于 options 中的 value，对象值等价于 reLabel 属性，label 属性会进行重写。 -->
