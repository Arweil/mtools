module.exports = {
  entry: 'src/index.tsx',
  bundleAnalyzerReport: false,
  devServer: {
    port: 9999,
    open: false,
  },
  css: {
    // postcssPX2ViewportConfig: {
    //   unitToConvert: 'px',
    //   viewportWidth: 750,
    //   unitPrecision: 5,
    //   propList: ['*'],
    //   viewportUnit: 'vw',
    //   fontViewportUnit: 'vw',
    //   // 忽略picker弹窗和toast弹窗的样式转换
    //   selectorBlackList: ['adm-picker', 'adm-toast'],
    //   minPixelValue: 1,
    //   mediaQuery: false,
    //   replace: true,
    //   include: undefined,
    //   landscape: false,
    //   landscapeUnit: 'vw',
    //   landscapeWidth: 750,
    // },
  },
};
