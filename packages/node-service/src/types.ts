import type { CheerioAPI } from 'cheerio';
import type { Express, Request } from 'express';
import type log4js from 'log4js';

type HttpProxyMiddlewareOptionsFilter = import('http-proxy-middleware').Filter;
type HttpProxyMiddlewareOptions = import('http-proxy-middleware').Options;
type NextFunction = import('express').NextFunction;

type ByPass = (req: Request, res: Response, proxyConfig: ProxyConfigArrayItem) => any;

export type ProxyConfigArrayItem = {
  path?: string[] | string | undefined; // express 路由路径
  context?: HttpProxyMiddlewareOptionsFilter | undefined; // http-proxy-middleware 的 context
} & {
  bypass?: ByPass;
} & HttpProxyMiddlewareOptions;
export type ProxyConfigArray = (
  | ProxyConfigArrayItem
  | ((
      req?: Request | undefined,
      res?: Response | undefined,
      next?: NextFunction | undefined,
    ) => ProxyConfigArrayItem)
)[];

export type NodeServiceConfig = {
  // 针对不同的项目，有些项目是挂载在路由下，挂载在路由下的项目可以配置此属性，有些项目是挂载在域名下
  baseRouter: string;
  // 静态资源的打包目录
  assetsDir: string;
  // 静态资源文件挂载的服务器目录，默认为根目录
  assetsServiceDir: string;
  // index.html
  indexPath: string;
  // 定义环境列表，可以把当前环境注入到cookie中，用于前端判断当前运行的环境
  envList: string[];
  // 配置代理，API同webpack，只实现了数组的使用方式，bypass不支持
  proxy: ProxyConfigArray;
  // 配置 listen 端口
  port: string;
  // 部署到 node 环境变量 KEY 名称
  DEPLOY_ENV: string;

  // 自定义node接口
  apis?: (app: Express) => void;

  // 自定义中间件
  middlewares?: (app: Express) => void;

  // 可以动态修改HTML标签在返回html的时候
  // 有时候我们往往希望注入一些运行时才存在的，必要的变量
  // 或者做一些页面配置化的时候
  injectHtml?: ($: CheerioAPI, req: Request) => void;
  // Content-Security-Policy 配置
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  CSP?: string;
  // 是否需要注入 _e 到 cookie中判断环境
  // 目前可以通过 window.$$_e 来获取环境，推荐使用此方法
  useCookieEnv?: boolean;

  logger?: {
    // default: 'console';
    category?: 'file' | 'console';
    file?: log4js.FileAppender; // 日志文件配置
  };

  gzip?: {
    exclude?: string[]; // 需要排除Content-type的文件
  };
};
