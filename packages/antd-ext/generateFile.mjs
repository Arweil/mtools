import { generateFile } from '@umijs/utils';
import { prompts } from '@umijs/utils';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = resolve(__dirname, '../../');
(async () => {
  const response = await prompts({
    type: 'text',
    name: 'compName',
    message: '请输入组件名称（Ext结尾）,按回车确认：',
    validate: value => {
      if (!value) {
        return '组件名称不能为空';
      }
      if (!value.endsWith('Ext')) {
        return '组件名称必须以"Ext"结尾';
      }
      return true;
    },
  });

  const { compName } = response;

  const templates = [
    {
      path: resolve(__dirname, './templates/component/Mix.tsx.tpl'),
      target: resolve(__dirname, `./components/${compName}/Mix.tsx`),
    },
    {
      path: resolve(__dirname, './templates/component/component.tsx.tpl'),
      target: resolve(__dirname, `./components/${compName}/${compName}.tsx`),
    },
    {
      path: resolve(__dirname, './templates/component/index.ts.tpl'),
      target: resolve(__dirname, `./components/${compName}/index.ts`),
    },
    {
      path: resolve(__dirname, './templates/component/ThemeHermes.tsx.tpl'),
      target: resolve(__dirname, `./components/${compName}/ThemeHermes.tsx`),
    },
  ];

  Promise.all(
    templates.map(({ path, target }) =>
      generateFile({
        path,
        target,
        baseDir: rootPath,
        data: {
          compName: response.compName,
        },
      }),
    ),
  ).then(res => {
    console.log('组件生成完毕~')
  });
})();
