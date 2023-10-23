const serviceConfig = require('./service.config');

module.exports = {
  entry: 'src/index.tsx',
  bundleAnalyzerReport: false,
  devServer: {
    port: 9876,
    open: false,
    proxy: serviceConfig.proxy,
  },
  css: {
    lessModifyVars: require('./theme'),
  },
};
