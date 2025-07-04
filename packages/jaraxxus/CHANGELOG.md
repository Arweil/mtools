## v5.0.0-alpha.0
1. webpack 4 升级到了 webpack 5

## v4.2.2
1. 修复了配置中 css.extract 的问题

## v4.2.1
1. 修正了 windows 操作系统解析路径的问题

## v4.2.0
1. 新增了 @svgr/webpack 用来处理 svg
2. @pmmmwh/react-refresh-webpack-plugin 插件新增了 overlay: false 以防止开发过程中reject弹窗提示
3. 新增了 favicon 配置，默认为 public/favicon.ico
4. 更新了包版本

## v4.1.4
1. 新增了 generate-asset-webpack-plugin 用于生成版本信息，并且会在html中注入版本信息，用于比对版本

## v4.1.3
1. 修复了 sass 的版本问题，sass 1.49.0 依赖 node8 版本，而 sass 1.49.1 依赖 node12版本

## v4.1.1
1. 修复了 postcss 配置文件不生效的问题
2. 新增了 config.css.postcssPX2ViewportConfig 配置 px2viewport 的入口
3. 使用 react-refresh 替代 react-hot-loader

## v4.1.0
1. 新增了对css module的支持
2. 支持windows的构建（path.posix）
3. 移除了对node-sass的依赖，使用dart-sass

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
