module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          browsers: [
            "defaults"
          ]
        }
      },
    ],
    '@babel/preset-typescript'
  ],
};
