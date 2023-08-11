## 0.6.1-alpha.0
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
