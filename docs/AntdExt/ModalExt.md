---
title: ModalExt
toc: menu
debug: true
---

# ModalExt

## 示例
<code src="../../packages/antd-ext/examples/ModalExt/hook"></code>
<code src="../../packages/antd-ext/examples/ModalExt/static"></code>
<code src="../../packages/antd-ext/examples/ModalExt/custom"></code>

## Modal.method()
包括：

- Modal.confirm()
- Modal.info()
- Modal.success()
- Modal.error()
- Modal.warning()

主要针对zeus主题下的Modal相关静态方法进行了调整，新增了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| backgroundImg | 弹窗背景 | React.ReactNode | | |
<!-- | type | 弹窗类型，主要影响弹窗的默认icon | info \| success \| error \| warning \| confirm | confirm |  | -->

## Modal.useModal()

Modal.useModal()创建的`modal`对象同antd的Modal.useModal()，拥有Modal.method()所有的方法。
