module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react/require-default-props': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'jsx-a11y/interactive-supports-focus': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'no-underscore-dangle': ['error', { allow: ['__POWERED_BY_QIANKUN__'] }],
    // https://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': ['off'],
    // https://github.com/iamturns/eslint-config-airbnb-typescript/issues/239
    'import/extensions': ['off'],
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
    // mobx中使用action.bound绑定this，不使用this可以不绑定
    '@typescript-eslint/unbound-method': ['off'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
  },
};
