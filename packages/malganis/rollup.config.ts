import * as path from 'path';
import * as fs from 'fs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import rollupPluginTypescript from '@rollup/plugin-typescript';

const input = fs.readdirSync(path.resolve('src')).map(item => path.resolve(`./src/${item}`));

const defaultRPOptions = {
  input,
  treeshake: true,
}

const defaultTSOptions = {
  module: 'ESNext',
  removeComments: true,
  importHelpers: true,
  declaration: true,
  include: [
    'src/**/*',
  ]
}

const browserBabelConfig = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead',
        },
        bugfixes: true,
        useBuiltIns: "usage",
        corejs: '3.16.2',
        shippedProposals: true
      },
    ]
  ]
};

const libOption = {
  ...defaultRPOptions,
  plugins: [
    rollupPluginTypescript({
      ...defaultTSOptions,
      jsx: 'react',
      outDir: 'lib',
    }),
  ],
  output: [
    {
      dir: 'lib',
      format: 'es',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin(browserBabelConfig),
      ]
    },
  ],
}

const rollupOptions = [
  {
    ...libOption,
    input,
  },
];

export default rollupOptions;
