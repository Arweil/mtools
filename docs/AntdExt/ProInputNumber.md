---
title: ProInputNumber
order: 4
toc: menu
---

# ProInputNumber

## 示例
<code src="../../packages/antd-ext/examples/ProInputNumber"></code>

## 逻辑拓展
基于 ant-design 的 Input 组件，编写了专用户输入数字的控件

此控件，**只可以输入数字，可以格式化整数部分千分位，可以控制小数位精度，超出精度的不可以输入**

在原有的Input基础上拓展了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| needThousandths | 千分位格式化 | boolean | - | 0.6.1-alpha.0 |
| precision | 小数位可输入的精度 | number | undefined | 0.6.1-alpha.0 |


## 样式拓展
拓展了 hermes 主题
