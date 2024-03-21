// 配置文件
import { defineConfig } from 'dumi';
import { resolve } from 'path';

export default defineConfig({
  themeConfig: {
    name: 'NW-WOW',
    nav: [
      { title: 'antd-ext', link: '/antd-ext' },
      { title: 'GitHub', link: 'https://github.com/Arweil/mtools' },
    ],
  },
  exportStatic: {},
  base: '/mtools/',
  publicPath: '/mtools/',
  hash: true,
  alias: {
    '@m-tools/antd-ext': resolve('./', 'packages/antd-ext/components/index.ts'),
  },
});
