import path from 'path';
import threadLoader from 'thread-loader';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import config from '../config';
import type { Configuration } from 'webpack';
import createAllStyleConfig from './styleLoaderHandler';

// threadload 预热
threadLoader.warmup({}, ['babel-loader']);
const maxAssetSize = 10000;

const baseConfig: Configuration = {
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.less'],
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: config.srcDir,
        use: [
          {
            // https://www.npmjs.com/package/thread-loader
            loader: require.resolve('thread-loader'),
            options: {},
          },
          {
            loader: require.resolve('babel-loader'),
            // https://babeljs.io/docs/en/options
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
                    corejs: 3
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
              plugins: [require.resolve("@babel/plugin-transform-runtime")],
              extends: config.babelExtends,
            }
          }
        ],
      },
      ...createAllStyleConfig(), // 处理样式
      {
        // https://webpack.js.org/guides/asset-modules
        test: /\.(bmp|png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: maxAssetSize,
          },
        },
        generator: {
          filename: 'img/[hash][ext][query]',
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            // https://www.npmjs.com/package/@svgr/webpack
            // 导入的svg可以直接变成一个组件使用
            loader: require.resolve('@svgr/webpack'),
            options: {
            },
          },
        ],
        issuer: /\.(ts|tsx|js|jsx)$/
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: maxAssetSize,
          },
        },
        generator: {
          filename: 'media/[hash][ext][query]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: maxAssetSize,
          },
        },
        generator: {
          filename: 'fonts/[hash][ext][query]',
        }
      },
    ]
  },
  plugins: [
  ]
}

export default baseConfig;
