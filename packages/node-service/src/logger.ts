import log4js from 'log4js';
import { getConfig } from './utils';

const { logger: loggerConfig } = getConfig();

const initLogger = (params: { category?: 'file' | 'console'; file?: log4js.FileAppender }) => {
  const { category, file } = params;
  const { filename, ...fileRestProps } = file || {};
  const config = {
    appenders: {
      console: { type: 'console' },
      file: {
        type: 'file',
        maxLogSize: '100M',
        backups: 10,
        filename: filename ?? 'logs/app.log',
        ...fileRestProps,
      },
    },
    categories: {
      default: {
        appenders: ['console'],
        level: 'debug',
      },
      file: {
        appenders: ['console', 'file'],
        level: 'debug',
      },
      console: {
        appenders: ['console'],
        level: 'debug',
      },
    },
  };

  log4js.configure(config);

  return log4js.getLogger(category ?? 'console');
};

const logger = initLogger(loggerConfig || {});

export default logger;
