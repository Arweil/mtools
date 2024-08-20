---
title: ConfigProviderExt
toc: menu
---

# ConfigProviderExt

## API
在原有的属性上新增了如下属性：
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| themeExt | 定义主题名称，设置后全局组件替换为定义的主题UI | `zeus` \| `hermes` \| `default` | `default` | 0.0.1-alpha.0 |

## ConfigProviderExt.config()
新增themeExt属性，主要针对Modal、Message、Notification 静态方法配置
