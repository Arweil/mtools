import type { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from './logger';
import type { ProxyConfigArrayItem } from './types';
import { getConfig } from './utils';

const { proxy } = getConfig();

const getProxyMiddleware = (proxyConfig: ProxyConfigArrayItem) => {
  proxyConfig.logLevel = 'debug';

  proxyConfig.logProvider = () => {
    return {
      log: logger.log.bind(logger),
      debug: logger.debug.bind(logger),
      info: logger.info.bind(logger),
      warn: logger.warn.bind(logger),
      error: logger.error.bind(logger),
    };
  };

  if (proxyConfig.target) {
    const context = proxyConfig.context || proxyConfig.path;

    // 兼容legacy http-proxy-middleware 的配置
    return createProxyMiddleware(context, proxyConfig);
  }

  if (proxyConfig.router) {
    return createProxyMiddleware(proxyConfig);
  }
};

export default (app: Express) => {
  if (proxy && proxy.length > 0) {
    proxy.forEach(proxyItem => {
      const proxyConfig = typeof proxyItem === 'function' ? proxyItem() : proxyItem;
      app.use(getProxyMiddleware(proxyConfig));
    });
  }
};
