import { Configuration, webpack } from 'webpack';
import merge from 'webpack-merge';
import WebpackDevServer from 'webpack-dev-server';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ProgressWebpackPlugin from 'progress-webpack-plugin';
import baseConfig from './webpack.base.conf';
import config from '../config';

process.env.NODE_ENV = 'development';

const devConfig = merge(baseConfig, {
  mode: 'development', // process.env.NODE_ENV === 'development'
  entry: [
    // babel-loader 实现了 transpiling
    // 此处引入 polyfill
    // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
    config.needPolyfill ? require.resolve('core-js/stable') : undefined,
    config.needPolyfill ? require.resolve('regenerator-runtime/runtime') : undefined,
  ],
  devtool: 'eval-source-map',
  devServer: config.devServer,
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ProgressWebpackPlugin(),
  ],
} as Configuration);

const compiler = webpack(devConfig);
const server = new WebpackDevServer(config.devServer, compiler);

const runServer = async () => {
  await server.start();
}

runServer();
