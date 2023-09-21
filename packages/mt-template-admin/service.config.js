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
  injectHtml: $ => {
    const eleList = $('#ns-inject');
    if (eleList && eleList.length) {
      $(eleList[0]).after(`<script>window.a=1</script>`);
    }
  },
  useCookieEnv: false,
};
