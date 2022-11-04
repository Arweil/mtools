# @m-tools/node-service
用于挂载静态资源，并且能够配置请求代理

## 使用方法
首先引用此包
```bash
$ npm i @m-tools/node-service --save
```

在根目录编写配置文件 *service.config.js*
```javascript
{
  // 针对不同的项目，有些项目是挂载在路由下，挂载在路由下的项目可以配置此属性，有些项目是挂载在域名下
  baseRouter: '',
  // 静态资源的打包目录
  assetsDir: '/dist',
  // 静态资源文件挂载的服务器目录，默认为根目录
  assetsServiceDir: '/',
  // index.html
  indexPath: '/dist/index.html',
  // 定义环境列表，可以把当前环境注入到cookie中，用于前端判断当前运行的环境
  envList: ['test', 'pre', 'prd'],
  // 部署到 node 环境变量 KEY 名称
  DEPLOY_ENV: 'DEPLOY_ENV',
  // API同webpack，只实现了数组的使用方式，bypass不支持
  proxy: [],
}
```

运行命令，启动node服务
```
$ node-service start
```
