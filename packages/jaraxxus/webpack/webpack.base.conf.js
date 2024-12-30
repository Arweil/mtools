const path = require('path');
const utils = require('./utils.js');
const config = require('../config/index.js');
const { initThreadLoader, workerPoolJS } = require('./threadLoader');

initThreadLoader();

const createLintingRule = () => ({
  test: /\.(js|jsx)$/,
  loader: require.resolve('eslint-loader'),
  enforce: 'pre',
  include: [config.srcDir],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true,
    configFile: config.eslintConfigFile,
  },
});

const baseConf = {
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.less'],
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
    fallback: {
      // "path": require.resolve("path-browserify"),
      // 根据需要添加其他 polyfill
    }
  },
  module: {
    rules: [
      ...(config.eslintConfigFile ? [createLintingRule()] : []),
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [config.srcDir],
        use: [
          {
            loader: require.resolve('thread-loader'),
            options: workerPoolJS,
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              cacheCompression: false, // 关闭gzip压缩提升构建效率
              babelrc: false,
              configFile: false,
              presets: [
                [
                  require.resolve('@babel/preset-env'),
                  {
                    useBuiltIns: 'entry',
                    corejs: 3,
                  },
                ],
                [
                  require.resolve('@babel/preset-react'),
                  {
                    development: process.env.NODE_ENV === 'development',
                    useBuiltIns: true,
                  },
                ],
                require.resolve('@babel/preset-typescript'),
              ],
              plugins: [
                process.env.NODE_ENV === 'development' && require.resolve('react-refresh/babel'),
                require.resolve('@babel/plugin-transform-runtime'),
              ].filter(Boolean),
              extends: config.babelExtends,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset',
        use: ['@svgr/webpack']
      },
      {
        test: /\.(png|jpe?g|gif|bmp)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          filename: utils.assetsPath('img/[name].[hash:7][ext]')
        }
      },
      ...utils.createAllStyleConfig(),
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: utils.assetsPath('media/[name].[hash:7][ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: utils.assetsPath('fonts/[name].[hash:7][ext]')
        }
      },
    ],
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
};

module.exports = baseConf;
