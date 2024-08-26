import log4js from 'log4js';

const initLogger = (params?: log4js.FileAppender) => {
  log4js.configure({
    appenders: {
      console: { type: 'console' },
      // file: {
      //   type: 'file',
      //   maxLogSize: '10M',
      //   backups: 10,
      //   filename: 'logs/app.log',
      //   ...params,
      // },
    },
    categories: {
      default: {
        appenders: ['console'],
        level: 'info',
      },
      console: {
        appenders: ['console'],
        level: 'info',
      },
    },
  });

  return log4js.getLogger('console');
};

export default initLogger;
