import fs from 'fs';
import path from 'path';

import type { NodeServiceConfig } from "./types";

export const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

export function getConfig(): NodeServiceConfig {
  const configPath = resolveApp('service.config.js');
  const customConfig = fs.existsSync(configPath) ? require(configPath) : {};

  return {
    // 针对不同的项目，有些项目是挂载在路由下，挂载在路由下的项目可以配置此属性，有些项目是挂载在域名下
    baseRouter: '',
    // 静态资源的打包目录
    assetsDir: '/dist',
    // 静态资源文件挂载的服务器目录，默认为根目录
    assetsServiceDir: '/',
    // index.html
    indexPath: '/dist/index.html',
    // 定义环境列表，可以把当前环境注入到cookie中，用于前端判断当前运行的环境
    envList: ['test', 'pre', 'prd'],
    // 部署到 node 环境变量 KEY 名称
    DEPLOY_ENV: 'DEPLOY_ENV',
    // 配置代理，API同webpack，只实现了数组的使用方式，bypass不支持
    proxy: [],
    // 配置 listen 端口
    port: '8080',
    apis: undefined,
    CSP: undefined,
    useCookieEnv: true,
    ...customConfig,
  };
}
