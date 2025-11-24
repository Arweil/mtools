import log4js from 'log4js';
import { getConfig } from './utils';

const { logger: loggerConfig } = getConfig();

const initLogger = (params: { category?: 'file' | 'console'; file?: log4js.FileAppender }) => {
  const { category, file } = params;
  const { filename, ...fileRestProps } = file || {};

  const config: log4js.Configuration = {
    appenders: {
      console: { type: 'console' },
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
  };

  // 只有在需要文件日志时才添加 file appender
  if (category === 'file' || file) {
    config.appenders.file = {
      type: 'file',
      maxLogSize: '100M',
      backups: 10,
      filename: filename ?? 'logs/app.log',
      ...fileRestProps,
    };

    config.categories.file = {
      appenders: ['console', 'file'],
      level: 'debug',
    };
  }

  log4js.configure(config);

  return log4js.getLogger(category ?? 'console');
};

const logger = initLogger(loggerConfig || {});

export default logger;
