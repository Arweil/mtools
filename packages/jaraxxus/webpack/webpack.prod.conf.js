const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateAssetPlugin = require('./generate-asset-webpack-plugin');

const baseConf = require('./webpack.base.conf.js');
const config = require('../config');
const utils = require('./utils');
const { resolveApp } = require('../config/utils');

const version = `r${new Date().getTime()}${Math.random().toString().slice(-6)}`;

let webpackProdConfig = merge(baseConf, {
  devtool: config.productionSourceMap ? 'source-map' : false,
  mode: 'production',
  entry: utils.entryHandler([
    config.needPolyfill ? require.resolve('core-js/stable') : undefined,
    config.needPolyfill ? require.resolve('regenerator-runtime/runtime') : undefined,
  ]),
  output: {
    publicPath: config.publicPath,
    path: resolveApp(config.outputDir),
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
    }),
    new OptimizeCSSPlugin(), // css优化最小化
    new GenerateAssetPlugin({
      filename: 'app.json',
      fn: (compilation, cb) => {
        cb(
          null,
          JSON.stringify({
            app: {
              name: require(resolveApp('package.json')).name,
              version,
            },
          }),
        );
      },
    }),
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          safari10: true,
          format: {
            comments: false,
            ascii_only: true,
            safari10: true,
          },
          sourceMap: config.productionSourceMap,
        },
      }),
    ],
  },
});

if (config.indexPath) {
  webpackProdConfig.plugins.push(
    new HtmlWebpackPlugin({
      version,
      template: config.indexPath,
      inject: true,
      favicon: config.favicon,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  );
}

if (config.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackProdConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(webpackProdConfig, config.configureWebpack);
