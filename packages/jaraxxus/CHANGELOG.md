## v4.0.0
1. 修改仓库地址
2. 默认 *indexPath* 配置为 *public/index.html*；
3. *jaraxxus.config.js* 为非必须文件；
4. webpack 配置中 resolve.extensions 默认为 js、ts、jsx、tsx、less、scss；
5. webpack 配置中 resolve.alias 默认为开发环境的src目录添加了@别名；
6. 优化css抽离，默认development环境不抽离，而production环境抽离；
7. 使用 npm-shrinkwrap 替代 package-lock.json；

## v3.1.2
1. 修正了dev环境端口检测的功能
2. 移除了不必要的包：fibers和eslint相关的包（对于saas-loader peerDependencies，npm v7后会自动安装，所以移除了依赖）
3. engines: node v10.x

## v3.1.1
1. npm包版本升级，导致一些API的变更
2. 移除了*thread-loader*对样式的处理（因为部分冲突），postcss加入了默认plugins，依旧支持*postcss.config.js*的支持，使用*postcss.config.js*会全量覆盖默认配置
3. 添加*babel-loader*的默认处理，依旧支持*babel.config.js*的配置，使用*babel.config.js*会全量覆盖默认配置
