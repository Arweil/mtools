// 配置文件
import { defineConfig } from 'dumi';
import { resolve } from 'path';

export default defineConfig({
  title: 'm-tools',
  mode: 'site',
  exportStatic: {},
  base: '/mtools',
  publicPath: '/mtools/',
  hash: true,
  navs: [
    null,
    { title: 'GitHub', path: 'https://github.com/Arweil/mtools' },
    { title: '更新日志', path: 'https://github.com/Arweil/mtools/releases' },
  ],
  alias: {
    'antd-ext': resolve('./', 'packages/antd-ext/components/index.ts'),
  },
});
