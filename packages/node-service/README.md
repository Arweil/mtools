# @m-tools/node-service
1. 用于挂载静态资源。提供把应用挂载到二级目录的能力。
2. 能够配置请求代理。
3. 方便区分客户端相关的包和服务端相关的包。在本地build后，不用全量安装node_module，安装此包后执行node服务挂载即可。
4. 暴露能够自定义接口的能力，比如健康检查，默认是<code>/health</code>接口，**get**请求。或者使用微前端时，需要根据环境动态获取子应用域名而封装的前端接口等等。
5. proxy api 和 webpack 兼容，配置一遍即可。

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
  // http-proxy-middleware
  proxy: [],
  // 自定义node接口
  apis: undefined, // (app: Express) => void
  // 配置 Content-Security-Policy，配置为 undefined 不会加此响应头，配置后，html页会返回此响应头
  CSP: undefined,
  // 是否需要注入 _e 到 cookie中判断环境
  // 目前可以通过 window.$$_e 来获取环境，推荐使用此方法，脚本默认注入到body中第一个script标签前
  useCookieEnv: true,
}
```

运行命令，启动node服务
```
$ node-service start
```

## 使用示例
*service.config.js*
```javascript
// 获取node运行的环境 'test' | 'pre' | 'prd'，一般从环境变量获取
// 对于本地开发环境，没有环境变量，默认dev
const env = process.env.DEPLOY_ENV || 'dev';

const targetEnv = {
  dev: 'http://proxy-test.target.path.com',
  test: 'http://proxy-test.target.path.com',
  pre: 'http://proxy-pre.target.path.com',
  prd: 'http://proxy.target.path.com',
}

module.exports = {
  proxy: [
    {
      context: ['/api'], // '/api'
      target: targetEnv[env],
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  ],
  useCookieEnv: false,
  apis: (app) => {
    app.get('/yourCustomApi', (req, res) => {
      res.send('OK');
    });
  },
  // copied from MDN
  CSP: `default-src 'self'; script-src 'report-sample' 'self' www.google-analytics.com/analytics.js assets.codepen.io production-assets.codepen.io 'sha256-GA8+DpFnqAM/vwERTpb5zyLUaN5KnOhctfTsqWfhaUA=' 'sha256-uogddBLIKmJa413dyT0iPejBg3VFcO+4x6B+vw3jng0='; script-src-elem 'report-sample' 'self' www.google-analytics.com/analytics.js assets.codepen.io production-assets.codepen.io 'sha256-GA8+DpFnqAM/vwERTpb5zyLUaN5KnOhctfTsqWfhaUA=' 'sha256-uogddBLIKmJa413dyT0iPejBg3VFcO+4x6B+vw3jng0='; style-src 'report-sample' 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; connect-src 'self' updates.developer.allizom.org updates.developer.mozilla.org www.google-analytics.com stats.g.doubleclick.net; font-src 'self'; frame-src 'self' interactive-examples.mdn.mozilla.net interactive-examples.prod.mdn.mozilla.net interactive-examples.mdn.allizom.net mdn.github.io yari-demos.prod.mdn.mozit.cloud mdn.mozillademos.org yari-demos.stage.mdn.mozit.cloud jsfiddle.net www.youtube-nocookie.com codepen.io survey.alchemer.com; img-src 'self' *.githubusercontent.com *.googleusercontent.com *.gravatar.com mozillausercontent.com firefoxusercontent.com profile.stage.mozaws.net profile.accounts.firefox.com mdn.mozillademos.org media.prod.mdn.mozit.cloud media.stage.mdn.mozit.cloud interactive-examples.mdn.mozilla.net interactive-examples.prod.mdn.mozilla.net interactive-examples.mdn.allizom.net wikipedia.org www.google-analytics.com www.gstatic.com; manifest-src 'self'; media-src 'self' archive.org videos.cdn.mozilla.net; child-src 'self'; worker-src 'self';`
};
```

*webpack.config.js*
```javascript
const serviceConfig = require('./service.config');

{
  devServer: {
    //...
    port: 9876,
    proxy: serviceConfig.proxy,
  },
}
```
