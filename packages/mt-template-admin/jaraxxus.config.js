const path = require('path');

module.exports = {
  entry: 'src/index.tsx',
  bundleAnalyzerReport: false,
  devServer: {
    port: 9876,
    open: false,
  },
  css: {
    sourceMap: true,
    lessModifyVars: require('./theme'),
  },
};
