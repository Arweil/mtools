export default {
  cjs: {
    input: 'src', // 默认编译目录
    platform: 'node', // 默认构建为 Browser 环境的产物
    transformer: 'babel', // 默认使用 babel 以提供更好的兼容性
    output: './cjs',
  },
};
