module.exports = {
  plugins: {
    'postcss-preset-env': {},
    // https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      // 忽略picker弹窗和toast弹窗的样式转换
      selectorBlackList: ['adm-picker', 'adm-toast', 'adm-dialog'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 750
    }
  }
}