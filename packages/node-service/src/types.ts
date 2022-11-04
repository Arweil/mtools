import type { Express } from 'express';

type HttpProxyMiddlewareOptionsFilter = import("http-proxy-middleware").Filter;
type HttpProxyMiddlewareOptions = import("http-proxy-middleware").Options;
type NextFunction = import("express").NextFunction;

type ByPass = (
  req: Request,
  res: Response,
  proxyConfig: ProxyConfigArrayItem
) => any;

export type ProxyConfigArrayItem = {
  path?: HttpProxyMiddlewareOptionsFilter | undefined;
  context?: HttpProxyMiddlewareOptionsFilter | undefined;
} & {
  bypass?: ByPass;
} & HttpProxyMiddlewareOptions;
export type ProxyConfigArray = (
  | ProxyConfigArrayItem
  | ((
    req?: Request | undefined,
    res?: Response | undefined,
    next?: NextFunction | undefined
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
  apis: (app: Express) => void;
}
