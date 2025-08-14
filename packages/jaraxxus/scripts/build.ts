process.env.NODE_ENV = 'production';

import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import webpack from 'webpack';
import { getJaraxxusConfig } from '../config';
import { resolveApp } from '../config/utils';
import webpackConfig from '../config/webpack/webpack.confg';

// 统一的 stats 输出配置
const statsConfig = {
  colors: true,
  modules: false,
  children: false,
  chunks: false,
  chunkModules: false,
} as const;

async function build() {
  const spinner = ora('building for production...');
  spinner.start();

  const config = getJaraxxusConfig();

  // 主动清空构建目录，而不是使用output下的clean选项
  // 更加灵活且能在构建前开始清理，避免构建过程中删除文件带来的问题
  fs.emptyDirSync(resolveApp(config.outputDir));

  const compiler = webpack(webpackConfig('production', config));

  return new Promise<void>((resolve, reject) => {
    compiler.run((err, stats) => {
      spinner.stop();

      if (err) {
        reject(err);
        return;
      }

      if (!stats) {
        reject(new Error('No stats available'));
        return;
      }

      if (stats.hasErrors()) {
        reject(new Error(stats.toString(statsConfig)));
        return;
      }

      process.stdout.write(stats.toString(statsConfig) + '\n\n');
      console.log(chalk.cyan('  Build complete.\n'));

      // 确保缓存被正确写入
      compiler.close(closeErr => {
        if (closeErr) {
          reject(closeErr);
          return;
        }
        resolve();
      });
    });
  });
}

export default build;
