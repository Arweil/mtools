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
    'src/*',
  ]
}

const nodeBabelConfig = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          node: '8.0.0'
        },
        bugfixes: true,
        modules: "cjs",
        useBuiltIns: "usage",
        corejs: '3.16.2',
        shippedProposals: true
      },
    ],
  ]
}

function fixRealPath(data) {
  const { dir } = data;
  return {
    resolveId(source, importer, options) {
      if (source === '@m-tools/isomorphic-utils') {
        return { id: `@m-tools/isomorphic-utils/${dir}/index`, external: true };
      }

      return null;
    }
  }
}

const cjsOption = {
  ...defaultRPOptions,
  plugins: [
    rollupPluginTypescript({
      ...defaultTSOptions,
      outDir: 'cjs',
    }),
    fixRealPath({ dir: 'cjs' }),
  ],
  output: [
    {
      dir: 'cjs',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin(nodeBabelConfig),
      ]
    },
  ],
}

const rollupOptions = [
  cjsOption,
];

export default rollupOptions;
