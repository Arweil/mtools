const webpack = require('webpack')
const merge = require('webpack-merge')
const ora = require('ora')
const chalk = require('chalk');
const webpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConf = require('./webpack.base.conf.js')
const config = require('../config/index.js')
const utils = require('./utils.js')
const { resolveApp, portInUse } = require('../config/utils');

const devConf = merge(baseConf, {
  // 会将 process.env.NODE_ENV 的值设为 development
  // 启用 NamedChunksPlugin 和 NamedModulesPlugin
  mode: 'development',
  entry: utils.entryHandler([
    config.needPolyfill ? require.resolve('core-js/stable') : undefined,
    config.needPolyfill ? require.resolve('regenerator-runtime/runtime') : undefined,
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
  ]),
  output: {
    publicPath: config.publicPath,
    path: resolveApp(config.outputDir),
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[name].js')
  },
  devtool: 'cheap-module-source-map', // 配置生成Source Maps，选择合适的选项
  module: {
    rules: utils.baseStyleLoader({
      cssModules: config.css.cssModules,
      sourceMap: config.css.sourceMap,
    })
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})

if (config.indexPath) {
  devConf.plugins.push(
    new HtmlWebpackPlugin({
      template: config.indexPath,
      inject: true,
    })
  )
}

async function run() {
  try {
    const port = config.devServer.port;

    const res = await portInUse(port);

    const devServerConf = config.devServer;

    const compiler = webpack(merge(devConf, config.configureWebpack));

    const server = new webpackDevServer(compiler, devServerConf)

    let spinner;
    let spinnerFlag = false;

    server.listen(port, '0.0.0.0', (err) => {
      console.log(`🥛  Start server on http://localhost:${port}`);

      spinner = ora('compiling for development...');
      spinner.start();
      spinnerFlag = true;
    })

    compiler.hooks.done.tap('CompilerProgressPlugins', function (stats) {
      if (spinnerFlag) {
        spinner.stop();
        spinnerFlag = false;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.log(chalk.red(info.errors));
      }

      const startTime = stats.startTime;
      const endTime = stats.endTime;

      const date = new Date(endTime);
      console.log(chalk.cyan(`[EndTime: ${date.toLocaleString()}.${date.getMilliseconds()} & During: ${endTime - startTime}ms] build completed.`))
    })
  } catch (ex) {
    console.error(ex);
  }
}

run();
