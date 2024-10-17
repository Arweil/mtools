/**
 * node 作为静态资源服务器，挂载资源，并且进行数据转发
 */

import express from 'express';
import logger from './logger';
import middleware from './middleware';
import { router } from './router';
import { getConfig } from './utils';

// 获取配置信息
const config = getConfig();
const { port } = config;

const app = express();

middleware(app);

router(app);

// 异常捕获
// @ts-ignore
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status ?? 500).send(`${err}`);
  }
});

process.on('uncaughtException', error => {
  logger.error('uncaughtException', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('unhandledRejection', 'Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// 启动服务，监听端口
app.listen(port, () => {
  console.log(`🥛  server running at port: ${port}`);
});
