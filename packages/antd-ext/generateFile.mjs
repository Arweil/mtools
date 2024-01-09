import { generateFile } from '@umijs/utils';
import { prompts } from '@umijs/utils';
import { dirname, resolve } from 'path';
import { exec } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = resolve(__dirname, '../../');
(async () => {
  const response = await prompts({
    type: 'text',
    name: 'compName',
    hint: 'CardExt',
    message: '请输入组件名称（Ext结尾）,按回车确认：',
    validate: value => {
      if (!value) {
        return '组件名称不能为空';
      }
      if (!value.endsWith('Ext')) {
        return '组件名称必须以"Ext"结尾';
      }
      const target = resolve(__dirname, `./components/${value}`);
      if (existsSync(target)) {
        return `组件已存在于${target}！请重新命名`;
      }
      return true;
    },
  });

  const { compName } = response;

  const indexTargetPath = resolve(__dirname, `./components/${compName}/index.ts`);
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
      target: indexTargetPath,
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
          originCompName: response.compName?.replace(/Ext/gi, ''),
        },
      }),
    ),
  ).then(res => {
    console.log('组件生成完毕~');

    exec(`code ${indexTargetPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`打开文件出错，请手动查看${indexTargetPath}`);
        return;
      }
      if (stderr) {
        console.error(`错误信息: ${stderr}`);
        return;
      }
    });
  });
})();
