const { isExistFile } = require('./utils');

const faviconPath = 'public/favicon.ico';

module.exports = {
  entry: 'src/index.js',
  needPolyfill: true,
  publicPath: '/',
  assetsDir: 'static',
  outputDir: 'dist',
  srcDir: 'src', // 开发目录
  eslintConfigFile: undefined, // eslint.rules.js为根目录文件
  indexPath: 'public/index.html',
  favicon: isExistFile(faviconPath) ? faviconPath : undefined,
  productionSourceMap: false,
  configureWebpack: {},
  bundleAnalyzerReport: false,
  babelExtends: 'babel.config.js', // 可以指定babel文件，默认为babel.config.js
  devServer: {
    port: 9999,
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
    static: {
      directory: undefined,
      publicPath: '/'
    },
    client: {
      overlay: {
        errors: true,
        warnings: false
      },
      logging: 'info'
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    cssModules: false,
    localIdentName: '',
    lessModifyVars: {},
    loaderOptions: {
      style: {}, // style-loader options
    },
  },
};
