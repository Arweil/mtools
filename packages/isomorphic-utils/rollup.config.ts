import * as path from 'path';
import * as fs from 'fs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import rollupPluginTypescript from '@rollup/plugin-typescript';

const input = fs.readdirSync(path.resolve('src')).map(item => path.resolve(`./src/${item}`));

const defaultRPOptions = {
  input,
  treeshake: true,
};

const defaultTSOptions = {
  module: 'ESNext',
  removeComments: true,
  importHelpers: true,
  declaration: true,
  include: ['src/*'],
};

const browserBabelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead',
        },
        modules: 'umd',
        bugfixes: true,
        useBuiltIns: 'usage',
        corejs: '3.16.2',
        shippedProposals: true,
      },
    ],
  ],
};

const esBabelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead',
        },
        bugfixes: true,
        useBuiltIns: 'usage',
        corejs: '3.16.2',
        shippedProposals: true,
      },
    ],
  ],
};

const nodeBabelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8.0.0',
        },
        bugfixes: true,
        modules: 'cjs',
        useBuiltIns: 'usage',
        corejs: '3.16.2',
        shippedProposals: true,
      },
    ],
  ],
};

const libOption = {
  ...defaultRPOptions,
  plugins: [
    rollupPluginTypescript({
      ...defaultTSOptions,
      outDir: 'lib',
    }),
  ],
  output: [
    {
      dir: 'lib',
      sourcemap: true,
      plugins: [getBabelOutputPlugin(browserBabelConfig)],
    },
  ],
};

const cjsOption = {
  ...defaultRPOptions,
  plugins: [
    rollupPluginTypescript({
      ...defaultTSOptions,
      outDir: 'cjs',
    }),
  ],
  output: [
    {
      dir: 'cjs',
      sourcemap: true,
      plugins: [getBabelOutputPlugin(nodeBabelConfig)],
    },
  ],
};

const esOption = {
  ...defaultRPOptions,
  plugins: [
    rollupPluginTypescript({
      ...defaultTSOptions,
      outDir: 'es',
    }),
  ],
  output: [
    {
      dir: 'es',
      format: 'es',
      sourcemap: true,
      plugins: [getBabelOutputPlugin(esBabelConfig)],
    },
  ],
};

const rollupOptions = [libOption, cjsOption, esOption];

export default rollupOptions;
