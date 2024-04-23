const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');
const path = require('path');
const { isString, isArray, isObject, resolveApp, isDevMode } = require('../config/utils');
const postcssLoadConfig = require('postcss-load-config');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const localIdentName = config.css.localIdentName || '[name]_[local]_[hash:base64:5]';

const hasPostcssConfig = (() => {
  try {
    return !!postcssLoadConfig.sync();
  } catch (_error) {
    return false;
  }
})();

// 创建样式配置
function createStyleLoaderConfig(cssLoaderOptions, preLoaderOptions, preLoader) {
  const isDevMode = process.env.NODE_ENV !== 'production';
  const postcssPX2ViewportConfig = config.css.postcssPX2ViewportConfig;

  const loaders = [
    {
      // https://github.com/webpack-contrib/css-loader
      loader: require.resolve('css-loader'),
      options: {
        ...cssLoaderOptions,
        sourceMap: isDevMode ? true : false,
      },
    },
  ];

  if (hasPostcssConfig) {
    loaders.push({
      // https://github.com/webpack-contrib/postcss-loader
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: isDevMode ? true : false,
      },
    });
  } else {
    loaders.push({
      // https://github.com/webpack-contrib/postcss-loader
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: isDevMode ? true : false,
        plugins: () =>
          [
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009', // Autoprefixer 将为规范的最终版本和 IE 10 版本添加前缀
              },
              stage: 3,
            }),
            require('postcss-normalize')(),
            postcssPX2ViewportConfig && Object.keys(postcssPX2ViewportConfig).length > 0
              ? require('postcss-px-to-viewport')(postcssPX2ViewportConfig)
              : false,
          ].filter(Boolean),
      },
    });
  }

  // 样式以何种方式加载
  if (isDevMode || !config.css.extract) {
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
        ...preLoaderOptions,
        sourceMap: true,
      },
    });
  }

  return loaders;
}

function createAllStyleConfig() {
  const rules = [
    {
      test: cssRegex,
      exclude: cssModuleRegex,
      use: createStyleLoaderConfig({
        importLoaders: 1,
        modules: config.css.cssModules
          ? {
              mode: 'local',
              compileType: 'icss',
              localIdentName,
            }
          : false,
      }),
    },
    {
      test: cssModuleRegex,
      use: createStyleLoaderConfig({
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
      use: createStyleLoaderConfig(
        {
          importLoaders: 2,
          modules: config.css.cssModules
            ? {
                mode: 'local',
                compileType: 'icss',
                localIdentName,
              }
            : false,
        },
        {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: config.css.lessModifyVars,
          },
        },
        'less-loader',
      ),
    },
    {
      test: lessModuleRegex,
      use: createStyleLoaderConfig(
        {
          importLoaders: 2,
          modules: {
            mode: 'local',
            localIdentName,
          },
        },
        {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: config.css.lessModifyVars,
          },
        },
        'less-loader',
      ),
    },
    {
      test: sassRegex,
      exclude: sassModuleRegex,
      use: createStyleLoaderConfig(
        {
          importLoaders: 2,
          modules: config.css.cssModules
            ? {
                mode: 'local',
                compileType: 'icss',
                localIdentName,
              }
            : false,
        },
        {},
        'sass-loader',
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
            localIdentName,
          },
        },
        {},
        'sass-loader',
      ),
    },
  ];

  return rules;
}

module.exports = {
  createAllStyleConfig,
  entryHandler(defaultEntry) {
    const filtedEntry = defaultEntry.filter(item => item);

    function resolveModules(entry) {
      let result = {};
      Object.entries(entry)
        .map(([key, values]) => {
          return {
            [key]: values.map(item => {
              if (item.import) {
                const deepCopy = {
                  ...item,
                };
                deepCopy.import = resolveApp(item.import);
                return deepCopy;
              } else {
                return resolveApp(item);
              }
            }),
          };
        })
        .forEach(item => {
          result = {
            ...result,
            ...item,
          };
        });

      return result;
    }

    let fin = '';
    if (isString(config.entry)) {
      fin = resolveModules({
        main: [...filtedEntry, config.entry],
      });
    } else if (isArray(config.entry)) {
      fin = resolveModules({
        main: [...filtedEntry, ...config.entry],
      });
    } else if (isObject(config.entry)) {
      fin = resolveModules({
        ...config.entry,
        main: [...filtedEntry, ...config.entry.main],
      });
    }

    return fin;
  },
  assetsPath(_path) {
    return path.posix.join(config.assetsDir, _path);
  },
};
