# Admin

指在快速搭建一个前端的中后台项目，并且包含了部分必要的技术栈依赖

中后台开发的关注点：
* 开发效率提升
* 技术管理选型
* 项目可维护性

初始化的项目包含哪些东西：
* 包含基础布局，其中包含：左侧导航，头部；
* 包含基础的功能接口，其中包含：登录、登出、修改密码、设置菜单，缓存用户数据；
* 包含nodejs作为静态资源服务器，并且能够进行请求转发的配置，方便启动生产服务；
* 使用typescript语法，为中后台复杂的数据类型和逻辑提供基础；
* 使用eslint去规范代码，使代码风格统一，并且远离不安全的写法；
* 使用mobx，更方便的管理复杂的应用状态，而不需要编写套版语法，开发效率更高；
* 兼容qiankun，可以直接作为微前端的子应用；

## 技术栈

| 技术栈 | 版本 | 浏览器兼容性 |
|:-----:|:-----:|:-----:|
| [react](https://zh-hans.reactjs.org/docs/getting-started.html) | 17 | [现代浏览器 IE >= 9](https://zh-hans.reactjs.org/docs/react-dom.html#browser-support) |
| [mobx](https://zh.mobx.js.org/README.html) | 6 | [现代浏览器，可回退兼容ES5](https://zh.mobx.js.org/installation.html#%E5%9C%A8%E8%BE%83%E6%97%A7%E7%9A%84javascript%E7%8E%AF%E5%A2%83%E4%B8%AD%E4%BD%BF%E7%94%A8mobx) |
| [mobx-react](https://github.com/mobxjs/mobx-react) | 7 |  |
| [react-router](https://reactrouter.com/web/guides/quick-start) | 7 |  |
| [ant-design](https://ant.design/components/overview-cn/) | 4 |  |
| [qiankun](https://qiankun.umijs.org/zh/guide) | 2.4.X |  |
| typescript |  |  |

## 目录简介
```javascript
|- api // 接口存放目录
  |- index.ts // 接口统一导出
|- public // 页面模板，favicon
|- server // node 静态资源服务器，包括代理转发
|- src // 开发目录
  |- errorPages // 包含403、404、500的错误页面
  |- layout // 头部和左侧菜单
  |- pages // 页面部分
  |- routers // 路由配置，所有页面路由建议统一配置，方便管理
  |- stores // 全局状态配置，只包含全局状态，页面状态建议分布在相应的页面中
  |- App.tsx // 根组件
  |- index.ts // 项目入口文件
|- babel.config.js // babel 相关配置
|- jaraxxus.config.js // webpack 构建工具相关配置
|- package-lock.json
|- package.json
|- theme.js // ant-design less 配置
|- tsconfig.json // tsconfig 配置
```

## eslint 规则
* [eslint-config-airbnb](https://github.com/airbnb/javascript)
