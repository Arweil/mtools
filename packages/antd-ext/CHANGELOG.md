## 1.1.1
1. 修复ModalExt组件content没有值的时候存在带高度的空节点问题
2. ModalExt组件样式调整

## 1.1.0
1. TableExt 中 emptyDesc 文案由 “没有数据” 改为 “暂无数据”
2. 新增 ModalExt 组件

## 1.0.1
1. 修正了 Notifaction 的 SVG 引用问题

## 1.0.0 - deprecated
1. 修改了 LayoutExt zeus 主题的样式
2. 更新了 LayoutExt hermes 主题的API

## 0.10.2
1. 库版本升级
  a. antd@5.19.0
  b. @ant-design/icons@5.3.7
2. 修正了 SelectOutLineExt 组件下拉框的样式问题

## 0.10.1
1. 修正了 LayoutExt 组件的部分样式

## 0.10.0
1. 新增了 TreeExt 组件
2. 新增了 UploadExt 组件
3. 新增了 zeus 主题的 Layout
4. 新增了 zeus 色板，已有组件新增了 zeus 的配色

## 0.9.0
1. 新增了 NotificationExt 组件
2. 库版本升级
  a. @ant-design/colors@7.0.2
  b. @ant-design/cssinjs@1.18.2
  c. antd@5.13.2
3. peerDependencies 升级
  a. React 版本依赖升级到 v18
  b. 更新了 dumi 至 v2 版本，用于升级 React 至 v18 版，[antd 对 React v17 兼容问题](https://github.com/ant-design/ant-design/issues/47732)


## 0.8.3
1. 优化了 TableExt 组件单元格默认展示一行，超出省略
2. 新增了 TableExt 组件，可以设置默认展示的行数

## 0.8.2
1. 修复了 SelectOutLineExt 组件的样式问题
2. 新增了 OutLine 相关组件的脱离 Form.Item 示例

## 0.8.1
1. 修复了 RangePickerOutLineExt 的样式问题
2. 修复了 LayoutExt 的样式问题

## 0.8.0
1. 新增了 DatePickerExt 组件以及 DatePickerOutLineExt、RangePickerOutLineExt 组件；
2. 新增了 *OutLineExt 相关组件的必填样式；
3. 升级了 antd 的版本至 5.12.1；@ant-design/cssinjs 至 1.18.0；@ant-design/icons 至 5.2.6；
4. 修复了部分主题配置不生效的问题；
5. 优化了部分文档测试用例；


## 0.7.0
1. 新增了 RadioGroupExt
2. 修复了 OutLine 组件 disabled 样式缺失的问题。
3. 新增了 SelectExt 的 multipleCheckbox 多选样式，会在可以在选项前加 checkbox。
4. 新增了 TableExt.Summary 和 TableExt.SkeletonItem 的导出。

## 0.6.5-alpha.0
1. 修复了 layoutExt 使用 ConfigProvider 修改变量造成的污染
2. 修复了 DrawerExt 使用 ConfigProvider 修改变量造成的污染
3. 新增了 TableExt 的 useEmpty 属性，始终使用无表格头的为空状态

## 0.6.3-alpha.0
1. 修复了 SelectOutLineExt 和 InputOutLineExt 样式修正
2. 优化了 TableExt 能够兼容复合表头的骨架屏

## 0.6.2-alpha.0
1. 修正了 NotFoundContent 的文案多语言支持

## 0.6.0-alpha.0
1. 新增了 ProInputNumber 自定义数字输入组件
2. 优化了 SelectExt 的默认筛选逻辑，目前只默认筛选字符串和数字

## 0.5.6-alpha.0
1. 修正了 @ant-design/cssinjs 版本的问题，@ant-design/cssinjs 1.11.1 导致antd样式丢失。目前使用1.9.1版本。
2. 修正了 father 的引用问题。改为 devDependencies。
3. 优化了 SelectExt 的功能，filterOption 可以匹配小写的英文选项

## 0.5.5-alpha.0
1. 修正了 类型文件丢失的问题。

## 0.5.4-alpha.0
1. 新增了 LayoutExt 的 siderWidth 属性。

## 0.5.3-alpha.0
1. 新增了demo实例，以及文档
2. 修正了 TableExt 自定义分页尺寸的加载问题，之前默认 10条/页
3. 修正了 DrawerExt 设置主题后，底部按钮主题不生效的问题

## 0.5.2-alpha.0
1. 优化了 RangeNumberExt，提供了 beforeInputNumberProps，afterInputNumberProps 两个属性，用来覆盖 props。

## 0.5.1-alpha.0
1. 修正了 SelectExt 的 hermes 主题的 虚拟列表 和 margin 问题，目前去掉了margin，后面寻找更好的实现方式。

## 0.5.0-alpha.0
1. 新增了 CascaderExt 级联，目前只暴露了 BaseCascaderExt 逻辑层组件
2. 修正了 TableExt 的 hermes 主题的 ConfigProvider，只对 Table 有作用

## 0.4.0-alpha.0
1. 升级了antd的版本 5.2.2 到 5.4.3
2. 新增了 DatePicker 以及他的 hermes 主题
3. 优化：LayoutExt 新增属性
  a. needMenuGroup 用于修改菜单一级是否是Group
  b. headerContent 用于设置headerTabs是否展示，并且可以自定义React节点替换
4. 暴露出逻辑层组件，命名为 `Base${ComponentName}Ext`;
  a. BaseButtonExt
  b. BaseTableExt
  c. BaseInputExt
  d. BaseSelectExt
  e. BaseDrawerExt
  f. BaseRangeNumberExt
  g. BaseLayoutExt
5. 实验性：暴露出来Hermes的颜色，可进行配置

## 0.3.1-alpha.0
1. 修正了 LayoutExt 组件的问题
  a. 内容高度过高的纵向滚动
  b. 移除了不必要的属性
  c. TabItem新增了key
  d. 非Group层级的菜单，且包含子菜单的菜单项移除跳转

## 0.3.0-alpha.0
1. 新增了 LayoutExt 组件，以及他的 hermes 主题

## 0.2.1-alpha.0
1. 修正了 SelectExt Hermes 主题的多选颜色问题
2. 修正了 RangeNumberExt 组件的赋值问题

## 0.2.0-alpha.0
1. 新增了 RangeNumberExt 组件，以及他的 hermes 主题
2. 优化：新增自定义 hooks：usePrefixCls，用来获取 prefixCls

## 0.1.2-alpha.0
1. 修正了 SelectExt 组件的一些类型问题

## 0.1.1-alpha.0
1. 增加了 SelectExt 组件对 fieldNames 的兼容
2. 修复了一些命名，包括TS的interface名称

## 0.1.0-alpha.0
1. 新增了 DrawerExt 组件，以及他的 hermes 主题

## 0.0.7-alpha.0
1. 修正了 SelectExt 组件，下拉列表高度属性调整（listHeight）

## 0.0.6-alpha.0
1. 新增了 SelectExt 组件，以及他的 hermes 主题

## 0.0.5-alpha.0
1. 新增了 InputExt 组件，以及他的 hermes 主题
2. 修复了 TableExt 首屏数据返回空，页面占位数据没清空的BUG
3. 优化了 TableExt组件、ButtonExt组件，使用 useMapTheme hooks

## 0.0.4-alpha.0
1. 修正了 TableExt 组件，以及 hermes 主题的 BUG。包括：空文案的BUG、骨架屏的BUG、分页器的BUG、hermes主题没有覆盖到的样式

## 0.0.3-alpha.0
1. 新增 TableExt 组件，以及他的 hermes 主题
2. 新增中文语言包的引用，导出为 locale
3. 修正了 ButtonExt hermes 主题，link 样式不设置最小宽度

## 0.0.2-alpha.0
1. 修正了ButtonExt hermes主题的样式
2. 为组件层提供主题的单独配置

## 0.0.1-alpha.0
1. 初始化项目
2. 提供了ButtonExt、ConfigProviderExt组件，以及他们的hermes主题
