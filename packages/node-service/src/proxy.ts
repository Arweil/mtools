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

  if (!proxyConfig.onError) {
    proxyConfig.onError = (err, req, res) => {
      // Re-throw error. Not recoverable since req & res are empty.
      if (!req && !res) {
        throw err; // "Error: Must provide a proper URL as target"
      }
      const host = req.headers && req.headers.host;
      const code = err.code;
      if (res.writeHead && !res.headersSent) {
        if (/HPE_INVALID/.test(code)) {
          res.writeHead(502);
        } else {
          switch (code) {
            case 'ECONNRESET':
            case 'ENOTFOUND':
            case 'ECONNREFUSED':
            case 'ETIMEDOUT':
              res.writeHead(504);
              break;
            default:
              res.writeHead(500);
          }
        }
        res.end(`Error occurred while trying to proxy: ${host}${req.url}`);
      }
    };
  }

  if (proxyConfig.router) {
    return createProxyMiddleware(proxyConfig);
  }

  // 兼容legacy http-proxy-middleware 的配置
  return createProxyMiddleware(proxyConfig.context, proxyConfig);
};

export default (app: Express) => {
  if (proxy && proxy.length > 0) {
    proxy.forEach(proxyItem => {
      const proxyConfig = typeof proxyItem === 'function' ? proxyItem() : proxyItem;

      const context = proxyConfig.path || proxyConfig.context;

      if (context && (Array.isArray(context) || typeof context === 'string')) {
        app.use(context, getProxyMiddleware(proxyConfig));
      } else {
        app.use(proxyConfig.path, getProxyMiddleware(proxyConfig));
      }
    });
  }
};
