module.exports = {
  proxy: [
    {
      context: ['/api'],
      target: 'http://www.baidu.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  ],
  useCookieEnv: false,
};
