module.exports = {
  entry: 'src/index.js',
  needPolyfill: true,
  publicPath: '/',
  assetsDir: 'static',
  outputDir: 'dist',
  srcDir: 'src', // 开发目录
  eslintConfigFile: undefined, // eslint.rules.js为根目录文件
  indexPath: 'public/index.html',
  productionSourceMap: false,
  configureWebpack: {},
  bundleAnalyzerReport: false,
  babelExtends: 'babel.config.js', // 可以指定babel文件，默认为babel.config.js
  devServer: {
    publicPath: '/',
    port: 9999,
    clientLogLevel: 'info',
    historyApiFallback: true,
    compress: true,
    hot: true, // 修改css不会reload，而修改js会reload页面
    open: true,
    overlay: { warnings: false, errors: true },
    contentBase: undefined,
    quiet: false,
    logLevel: 'error', // webpack-dev-server ~> webpack-log 中配置的level选项
  },
  css: {
    sourceMap: false,
    cssModules: false,
    lessModifyVars: {},
    loaderOptions: {
      style: {}, // style-loader options
    }
  }
}
