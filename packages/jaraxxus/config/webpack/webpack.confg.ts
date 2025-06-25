import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import type { Configuration, RuleSetRule } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import type { CssLoaderOptions, JaraxxusConfig } from '../../types';
import { isString, resolveApp } from '../utils';
import GenerateAssetPlugin from './generate-asset-plugin';

const imageInlineSizeLimit = 10000;

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

export default function (
  webpackEnv: 'development' | 'production',
  jaraxxusConfig: JaraxxusConfig,
): Configuration {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const version = `r${new Date().getTime()}${Math.random().toString().slice(-6)}`;
  const {
    entry,
    srcDir,
    publicPath,
    outputDir,
    indexPath,
    favicon,
    assetsDir,
    babelExtends,
    babelInclude,
    productionSourceMap,
    bundleAnalyzerReport,
    css = {},
    configureWebpack = {},
  } = jaraxxusConfig;
  const { cssModules, localIdentName, lessModifyVars } = css;

  const getStyleLoaders = (
    cssOptions: CssLoaderOptions,
    preProcessor?: string,
    preLoaderOptions: Record<string, any> = {},
  ) => {
    const loaders: RuleSetRule['use'] = [
      isEnvDevelopment && {
        loader: require.resolve('style-loader'),
        options: css.styleLoaderOptions,
      },
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          ...cssOptions,
          sourceMap: isEnvDevelopment,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          sourceMap: isEnvDevelopment,
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {
                  autoprefixer: { flexbox: 'no-2009' },
                  stage: 3,
                },
              ],
              'postcss-normalize',
            ],
          },
        },
      },
    ].filter(Boolean);

    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          ...preLoaderOptions,
          sourceMap: true,
        },
      });
    }

    return loaders;
  };

  const webpackConfig: Configuration = {
    mode: webpackEnv,
    stats: 'errors-only',
    devtool: isEnvProduction
      ? productionSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: isString(entry) ? resolveApp(entry) : entry,
    output: {
      publicPath,
      path: resolveApp(outputDir),
      filename: isEnvProduction
        ? `${assetsDir}/js/[name].[contenthash:8].js`
        : `${assetsDir}/js/[name].js`,
      chunkFilename: isEnvProduction
        ? `${assetsDir}/js/[name].[contenthash:8].chunk.js`
        : `${assetsDir}/js/[name].chunk.js`,
      assetModuleFilename: `${assetsDir}/media/[name].[hash][ext]`,
    },
    // cache: {
    //   type: 'filesystem',
    //   store: 'pack',
    //   buildDependencies: {
    //     defaultWebpack: ['webpack/lib/'],
    //     config: [__filename],
    //   },
    // },
    infrastructureLogging: isEnvDevelopment
      ? {
          level: 'info',
          debug: ['webpack-dev-server'],
        }
      : undefined,
    optimization: {
      concatenateModules: bundleAnalyzerReport ? false : isEnvProduction,
      minimize: false,
      minimizer: [
        new TerserWebpackPlugin({
          // parallel: true,  // 启用并行压缩
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 2018,
            },
            compress: {
              ecma: 5,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
            sourceMap: productionSourceMap,
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    resolve: {
      symlinks: false,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.less'],
      alias: {
        '@': resolveApp('src'),
      },
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: imageInlineSizeLimit,
                },
              },
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: require.resolve('@svgr/webpack'),
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{ removeViewBox: false }],
                    },
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: require.resolve('file-loader'),
                  options: {
                    name: 'static/media/[name].[hash].[ext]',
                  },
                },
              ],
              issuer: {
                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
              },
            },
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              type: 'asset/resource',
            },
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              type: 'asset/resource',
            },
            {
              test: /\.(js|jsx|ts|tsx)$/,
              include: babelInclude || [srcDir],
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                babelrc: false,
                configFile: false,
                compact: isEnvProduction,
                presets: [
                  [
                    require.resolve('@babel/preset-env'),
                    {
                      corejs: 3,
                      useBuiltIns: 'entry',
                    },
                  ],
                  [
                    require.resolve('@babel/preset-react'),
                    {
                      development: isEnvDevelopment,
                      useBuiltIns: true,
                    },
                  ],
                  require.resolve('@babel/preset-typescript'),
                ],
                plugins: [
                  isEnvDevelopment && require.resolve('react-refresh/babel'),
                  [
                    require.resolve('@babel/plugin-transform-runtime'),
                    {
                      corejs: false,
                      helpers: true,
                      regenerator: true,
                    },
                  ],
                ].filter(Boolean),
                extends: babelExtends,
              },
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction ? productionSourceMap : isEnvDevelopment,
                modules: cssModules ? { mode: 'icss' } : false,
              }),
              sideEffects: true,
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                modules: {
                  mode: 'local',
                  localIdentName,
                },
              }),
            },
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  modules: cssModules ? { mode: 'icss' } : false,
                },
                'less-loader',
                {
                  lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: lessModifyVars,
                  },
                },
              ),
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  modules: {
                    mode: 'local',
                    localIdentName,
                  },
                },
                'less-loader',
                {
                  lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: lessModifyVars,
                  },
                },
              ),
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  modules: cssModules ? { mode: 'icss' } : false,
                },
                'sass-loader',
                {},
              ),
              sideEffects: true,
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  modules: {
                    mode: 'local',
                    localIdentName,
                  },
                },
                'sass-loader',
                {},
              ),
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            version,
            template: indexPath,
            inject: true,
            favicon,
          },
          isEnvProduction
            ? {
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
              }
            : undefined,
        ),
      ),

      bundleAnalyzerReport && new BundleAnalyzerPlugin(),

      isEnvDevelopment && new ReactRefreshWebpackPlugin({ overlay: false }),

      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: `${assetsDir}/css/[name].[contenthash:8].css`,
          chunkFilename: `${assetsDir}/css/[name].[contenthash:8].chunk.css`,
        }),
      isEnvProduction &&
        new GenerateAssetPlugin({
          filename: 'app.json',
          fn: (_compilation, cb) => {
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
    ].filter(Boolean),
  };

  return merge(webpackConfig, configureWebpack);
}
