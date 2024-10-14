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
        level: 'debug',
      },
      console: {
        appenders: ['console'],
        level: 'debug',
      },
    },
  });

  return log4js.getLogger('console');
};

const logger = initLogger();

export default logger;
