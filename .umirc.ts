// 配置文件
export default {
  title: 'm-tools',
  mode: 'site',
  exportStatic: {},
  hash: true,
  navs: [
    null,
    { title: 'GitHub', path: 'https://github.com/Arweil/mtools' },
    { title: '更新日志', path: 'https://github.com/Arweil/mtools/releases' },
  ],
  alias: {
    'antd-ext': __dirname + '/packages/antd-ext',
  },
};
