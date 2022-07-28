import type { RuleSetRule, RuleSetUseItem } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import config from '../config';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

// 创建样式配置
function createStyleLoaderConfig(cssLoaderOptions: {
  importLoaders: number; // 在css-loader之前有多少个加载器
  modules: { // 以何种方式编译
    mode: 'local' | 'icss';
  };
}, preLoader?: string): RuleSetUseItem[] {
  const isDevMode = process.env.NODE_ENV !== 'production';

  const loaders: RuleSetUseItem[] = [
    {
      // https://github.com/webpack-contrib/css-loader
      loader: require.resolve('css-loader'),
      options: {
        ...cssLoaderOptions,
        sourceMap: isDevMode ? true : false,
      },
    },
    {
      // https://github.com/webpack-contrib/postcss-loader
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: isDevMode ? true : false,
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009', // Autoprefixer 将为规范的最终版本和 IE 10 版本添加前缀
                },
                stage: 3,
              },
            ],
            'postcss-normalize',
          ]
        }
      }
    },
  ];

  // 样式以何种方式加载
  if (isDevMode) {
    // https://github.com/webpack-contrib/style-loader
    // 使用style标签
    loaders.unshift({
      loader: require.resolve('style-loader'),
      options: config.css.styleLoaderOptions,
    });
  } else {
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    // 提取样式为css文件
    loaders.unshift(MiniCssExtractPlugin.loader);
  }

  // 样式预处理
  if (preLoader) {
    loaders.push({
      loader: require.resolve(preLoader),
      options: {
        sourceMap: true,
      }
    });
  }

  return loaders;
}

function createAllStyleConfig(): RuleSetRule[] {
  const rules = [
    {
      test: cssRegex,
      include: config.srcDir,
      exclude: cssModuleRegex,
      use: createStyleLoaderConfig({
        importLoaders: 1,
        modules: {
          mode: 'icss',
        }
      })
    },
    {
      test: cssModuleRegex,
      include: config.srcDir,
      use: createStyleLoaderConfig({
        importLoaders: 1,
        modules: {
          mode: 'local',
        }
      })
    },
    {
      test: lessRegex,
      include: config.srcDir,
      exclude: lessModuleRegex,
      use: createStyleLoaderConfig({
        importLoaders: 2,
        modules: {
          mode: 'icss',
        }
      }, 'less-loader'),
    },
    {
      test: lessModuleRegex,
      include: config.srcDir,
      use: createStyleLoaderConfig({
        importLoaders: 2,
        modules: {
          mode: 'local',
        }
      }, 'less-loader'),
    },
    {
      test: sassRegex,
      exclude: sassModuleRegex,
      use: createStyleLoaderConfig(
        {
          importLoaders: 2,
          modules: {
            mode: 'icss',
          },
        },
        'sass-loader'
      ),
      sideEffects: true,
    },
    {
      test: sassModuleRegex,
      use: createStyleLoaderConfig(
        {
          importLoaders: 2,
          modules: {
            mode: 'local',
          },
        },
        'sass-loader'
      ),
    },
  ];

  return rules;
}

export default createAllStyleConfig;
