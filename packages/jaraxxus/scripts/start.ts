process.env.NODE_ENV = 'development';

import chalk from 'chalk';
import ora from 'ora';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { getJaraxxusConfig } from '../config';
import webpackConfig from '../config/webpack/webpack.confg';

async function start() {
  const spinner = ora('compiling for development...');

  const config = getJaraxxusConfig();
  const devServer = config.devServer;

  if (!devServer) {
    throw new Error('devServer configuration is required');
  }

  const port = devServer.port;
  if (!port) {
    throw new Error('devServer.port is required');
  }

  const compiler = webpack(webpackConfig('development', config));

  // 添加编译进度显示
  compiler.hooks.done.tap('CompilerProgressPlugins', stats => {
    spinner.stop();

    if (stats.hasErrors()) {
      console.log(chalk.red(stats.toString({ chunks: false, colors: true })));
      return;
    }

    const startTime = stats.startTime;
    const endTime = stats.endTime;
    const date = new Date(endTime);

    console.log(
      chalk.cyan(
        `[EndTime: ${date.toLocaleString()}.${date.getMilliseconds()} & During: ${
          endTime - startTime
        }ms] build completed.`,
      ),
    );
    console.log(chalk.cyan(`🥛  Start server on http://localhost:${port}`));
  });

  const server = new WebpackDevServer(devServer, compiler);

  return new Promise<void>((resolve, reject) => {
    server.startCallback(err => {
      if (err) {
        spinner.stop();
        reject(err);
        return;
      }

      spinner.start();
      resolve();
    });
  });
}

export default start;
