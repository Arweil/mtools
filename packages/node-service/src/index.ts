/**
 * node 作为静态资源服务器，挂载资源，并且进行数据转发
 */
import path from 'path';
import fs from 'fs';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import proxy from './proxy';
import { getConfig, appDirectory } from './utils';

// 获取配置信息
const config = getConfig();
const { baseRouter, assetsDir, assetsServiceDir, indexPath, envList, port, DEPLOY_ENV, apis } = config;

const ENV = process.env[DEPLOY_ENV] || 'dev';

const app = express();

app.disable('x-powered-by');
app.enable('trust proxy');

app.use(compression()); // gzip压缩
app.use(cookieParser());
app.use(assetsServiceDir, express.static(path.join(appDirectory, assetsDir)));

// 把环境变量返回给前端
app.use((req, res, next) => {
  const list = ['dev', ...envList];
  const value = list.indexOf(ENV);
  if (!req.cookies._e || Number(req.cookies._e) !== value) {
    res.cookie('_e', value);
  }
  next();
});

// 使用代理
proxy(app);

// 自定义接口
if (apis) {
  apis(app);
}

// 健康险检查
app.get(baseRouter + '/health', (req, res) => {
  res.status(200).send('OK');
});

// 挂载页面
app.get(baseRouter + '/*', (req, res) => {
  res.sendFile(path.join(appDirectory, indexPath));
});

// 启动服务，监听端口
app.listen(port, () => {
  console.log(`🥛  server running at port: ${port}`);
});
