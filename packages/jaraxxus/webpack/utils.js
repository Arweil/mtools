const path = require('path')
const config = require('../config/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { isString, isArray, isObject, resolveApp, isDevMode } = require('../config/utils');
const { workerPoolLess, workerPoolSass } = require('./threadLoader');
const postcssLoadConfig = require('postcss-load-config');

function baseCssLoader ({ cssModules, sourceMap }) {
  const hasPostcssConfig = (() => {
    try {
      return !!postcssLoadConfig.sync();
    } catch (_error) {
      return false;
    }
  })();

  function MakeLoaders (arr) {
    let result = [
      // {
      //   loader: require.resolve('thread-loader'),
      //   options: arr.includes('sass') ? workerPoolSass : workerPoolLess,
      // },
    ];

    let obj = {}
    for (let i = 0, len = arr.length; i < len; i++) {
      let cnfg = { loader: require.resolve(`${arr[i]}-loader`) }
      cnfg.options = {
        sourceMap: !!sourceMap
      }

      // css-loader 的模块化配置
      if (arr[i] === 'css' && cssModules) {
        cnfg.options.modules = cssModules
      }

      if (arr[i] === 'less') {
        cnfg.options.lessOptions = {
          javascriptEnabled: true,
          modifyVars: config.css.lessModifyVars 
        };
      }

      // postcss-loader 配置
      if (arr[i] === 'postcss' && !hasPostcssConfig) {
        cnfg.options.ident = 'postcss';
        cnfg.options.plugins = [
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          require('postcss-normalize')(),
        ]
      }

      result.push(cnfg);
    }

    obj.use = result

    // style-loader 放到use数组起始位置
    if (isDevMode) {
      obj.use.unshift({
        loader: require.resolve('style-loader'),
        options: config.css.loaderOptions.style,
      })
    } else {
      obj.use.unshift(MiniCssExtractPlugin.loader)
    }

    return obj
  }

  return {
    // style-loader 用于脚本的提取，关联html
    // css-loader 可以使脚本直接require *.css文件
    // less-loader 可以使脚本直接require *.less文件
    // postcss-loader
    // 注意loader加载顺序(style, css, postcss, less)，否则会出错
    css: MakeLoaders(['css', 'postcss']),
    less: MakeLoaders(['css', 'postcss', 'less']),
    scss: MakeLoaders(['css', 'postcss', 'sass']),
  }
}

module.exports = {
  entryHandler (defaultEntry) {
    const filtedEntry = defaultEntry.filter((item) => item);

    function resolveModules(entry) {
      let result = {};
      Object.entries(entry).map(([key, values]) => {
        return {
          [key]: values.map(item => {
            if (item.import) {
              const deepCopy = { ...item }
              deepCopy.import = resolveApp(item.import);
              return deepCopy;
            } else {
              return resolveApp(item);
            }
          }),
        };
      }).forEach((item) => {
        result = {
          ...result,
          ...item
        }
      });

      return result;
    }

    let fin = '';
    if (isString(config.entry)) {
      fin = resolveModules({
        main: [...filtedEntry, config.entry]
      });
    } else if (isArray(config.entry)) {
      fin = resolveModules({
        main: [...filtedEntry, ...config.entry]
      });
    } else if (isObject(config.entry)) {
      fin = resolveModules({
        ...config.entry,
        main: [...filtedEntry, ...config.entry.main]
      })
    }

    return fin;
  },
  assetsPath (_path) {
    return path.join(config.assetsDir, _path)
  },
  baseStyleLoader ({ cssModules, sourceMap }) {
    let arrStyleLoader = ['less', 'scss', 'css'];

    let rules = [];

    for (let i = 0, len = arrStyleLoader.length; i < len; i++) {
      let config = baseCssLoader({ cssModules, sourceMap })[arrStyleLoader[i]];
      config.test = new RegExp(`\\.${arrStyleLoader[i]}$`);
      rules.push(config);
    }

    return rules;
  }
}
