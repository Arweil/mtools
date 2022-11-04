import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Express } from 'express';
import type { ProxyConfigArrayItem } from './types';
import { getConfig } from './utils';

const { proxy } = getConfig();

const getProxyMiddleware = (proxyConfig: ProxyConfigArrayItem) => {
  proxyConfig.logLevel = 'debug';

  if (proxyConfig.target) {
    const context = proxyConfig.context || proxyConfig.path;

    // 兼容legacy http-proxy-middleware 的配置
    return createProxyMiddleware(
      context,
      proxyConfig,
    );
  }

  if (proxyConfig.router) {
    return createProxyMiddleware(proxyConfig);
  }
};

export default (app: Express) => {
  if (proxy && proxy.length > 0) {
    proxy.forEach((proxyItem) => {
      let proxyConfig = typeof proxyItem === 'function' ? proxyItem() : proxyItem;
      app.use(getProxyMiddleware(proxyConfig))
    });
  }
}
