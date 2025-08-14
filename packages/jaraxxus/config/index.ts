import _ from 'lodash';
import type { JaraxxusConfig } from '../types';
import { isArray, isExistFile, isString, resolveApp } from './utils';

const faviconPath = 'public/favicon.ico';

const jaraxxusConfig: JaraxxusConfig = {
  entry: 'src/index.js',
  publicPath: '/',
  assetsDir: 'static',
  outputDir: 'dist',
  srcDir: 'src', // 开发目录
  indexPath: 'public/index.html',
  favicon: isExistFile(faviconPath) ? faviconPath : undefined,
  productionSourceMap: false,
  bundleAnalyzerReport: false,
  babelExtends: 'babel.config.js', // 可以指定babel文件，默认为babel.config.js
  devServer: {
    // 基础配置
    port: 9999, // 开发服务器端口
    open: true, // 自动打开浏览器
    compress: true, // 启用 gzip 压缩

    // 路由配置
    historyApiFallback: true, // 支持 HTML5 History API

    // 客户端配置
    client: {
      overlay: {
        // 错误覆盖层配置
        errors: true, // 显示错误
        warnings: false, // 不显示警告
      },
      progress: true, // 显示编译进度
      logging: 'info', // 客户端日志级别
    },

    // 静态文件配置
    static: {
      directory: 'public', // 静态文件目录
      publicPath: '/', // 静态文件公共路径
    },
  },
  css: {
    extract: true,
    cssModules: false,
    localIdentName: '[hash:base64]',
    lessModifyVars: {},
  },
};

export function getJaraxxusConfig(): JaraxxusConfig {
  // 获取配置信息
  const configPath = 'jaraxxus.config.js';
  const customConfig = isExistFile(configPath) ? require(resolveApp(configPath)) : {};
  const config = _.merge(jaraxxusConfig, customConfig);

  const pathOfBabelConfig = resolveApp(config.babelExtends);

  let srcDir = config.srcDir;
  if (isString(srcDir)) {
    srcDir = resolveApp(srcDir);
  } else if (isArray(srcDir)) {
    srcDir = srcDir.map((src: string) => resolveApp(src));
  } else {
    srcDir = '';
  }

  return {
    ...config,
    srcDir,
    babelExtends: isExistFile(pathOfBabelConfig) ? pathOfBabelConfig : undefined,
  };
}
