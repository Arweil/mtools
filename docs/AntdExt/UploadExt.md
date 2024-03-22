---
title: UploadExt
toc: menu
---

# UploadExt

## 示例

<code src="../../packages/antd-ext/examples/UploadExt"></code>


在原有的 Upload 基础上拓展了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| uploadBtnPosition | 上传区域的位置。仅对listType为空（默认）时生效 | 'top' \| 'bottom' | 'bottom' |  | |

## 逻辑拓展
基于 ant-design 的 Upload 组件，修改了：
1. 默认listType不传值，此时会使用基于picture-card改造的样式。
