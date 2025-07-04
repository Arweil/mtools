# Jaraxxus

用此工具包可以快速创建一个 React 开发环境。提高项目创建效率。

## Usage

- 创建 React 项目后，在根目录添加*jaraxxus.config.js*配置文件进行 webpack 的基本配置；
- _jaraxxus start_ 命令用作 dev 环境；
- _jaraxxus build_ 命令用作项目打包。
- dev 环境中需要 node >= 18.20

## API

jaraxxus.config.js

```javascript
module.exports = {
  entry: 'src/index.js', // webpack entry
  publicPath: '/', // output.publicPath
  assetsDir: 'static', // 资源目录
  outputDir: 'dist', // 打包目录
  srcDir: 'src', // 开发目录
  indexPath: 'public/index.html', // SPA入口HTML
  favicon: 'public/favicon.ico', // 站点favicon
  productionSourceMap: false, // 生成环境是否需要sourcemap js
  configureWebpack: {}, // webpack 配置，最后通过webpack-merge合并配置
  bundleAnalyzerReport: false, // webpack-bundle-analyzer 是否启用
  devServer: WebpackDevServerConfiguration,
  css: {
    extract: true, // production 环境下，
    cssModules: false, // 是否启用css模块化
    lessModifyVars: {}, // less modifyVars 配置
  },
};
```

## 配置 babel

此版本已经不需要额外的配置*babel.config.js*文件了。

如果需要额外的配置，默认使用*babel*中的*extends*配置项去拓展配置。

babel.config.js 参考文件

```javascript
module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
        targets: {
          browsers: [
            'last 3 versions',
            'ie >= 9',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 6',
            'opera >= 12.1',
            'ios >= 6',
            'android >= 4.4',
            'bb >= 10',
            'and_uc 9.9',
          ],
        },
      },
    ],
    [
      require.resolve('@babel/preset-react'),
      {
        development: process.env.NODE_ENV === 'development',
        useBuiltIns: true,
      },
    ],
    require.resolve('@babel/preset-typescript'), // support ts
  ],
  plugins: [
    require.resolve('react-hot-loader/babel'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-export-default-from'),
  ],
};
```

## 关于 postcss

此版本已经不需要格外的配置*postcss.config.js*文件了。

如果需要额外的配置，可以另外声明*postcss.config.js*，将会覆盖已有的默认配置（_postcss-preset-env_ & _postcss-normalize_）。

## What means Jaraxxus

![Load Jaraxxus](https://github.com/Arweil/Jaraxxus/blob/master/jaraxxus.png) ![Infernal](https://github.com/Arweil/Jaraxxus/blob/master/infernal.png)

Jaraxxus 是炉石中的一个恶魔，他非常强大，2 费可以召唤一个 666 的地狱火。

我希望此项目也能通过简单的配置创建出强大的 React 项目。
