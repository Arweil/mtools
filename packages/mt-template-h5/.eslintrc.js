module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
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
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    // https://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': [0],
    // https://github.com/iamturns/eslint-config-airbnb-typescript/issues/239
    'import/extensions': [0],
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
    // mobx中使用action.bound绑定this，不使用this可以不绑定
    '@typescript-eslint/unbound-method': [0],
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/112261cbc84f5b7d74de9b427b529a10b41faece/docs/rules/click-events-have-key-events.md
    'jsx-a11y/click-events-have-key-events': [0],
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/112261cbc84f5b7d74de9b427b529a10b41faece/docs/rules/no-static-element-interactions.md
    'jsx-a11y/no-static-element-interactions': [0],
  },
};
