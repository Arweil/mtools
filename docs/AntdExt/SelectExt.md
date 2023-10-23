---
title: SelectExt
order: 5
toc: menu
---

# SelectExt

## 示例
<code src="../../packages/antd-ext/examples/SelectExt"></code>

## 逻辑拓展
基于 ant-design 的 Select 组件，修改了：
1. 重新设置了为空状态，通过 *notFoundContent* 属性
2. 为选项省略提供 tooltip 的展示。options 中的 *relLabel* 表示传入的 label 属性，label 属性会进行重写。
3. 新增了 *dataMap* 属性，可以传入对象进行数据绑定，对象键 等价于 options 中的 value，对象值等价于 reLabel 属性，label 属性会进行重写。
