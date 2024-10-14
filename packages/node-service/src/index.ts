/**
 * node 作为静态资源服务器，挂载资源，并且进行数据转发
 */
import * as cheerio from 'cheerio';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import fs from 'fs';
import path from 'path';
import proxy from './proxy';
import { appDirectory, getConfig } from './utils';

// 获取配置信息
const config = getConfig();
const {
  baseRouter,
  assetsDir,
  assetsServiceDir,
  indexPath,
  envList,
  port,
  DEPLOY_ENV,
  CSP,
  useCookieEnv,
  apis,
  injectHtml,
} = config;

const ENV = process.env[DEPLOY_ENV] || 'dev';

function getEnv() {
  const list = ['dev', ...envList];
  const value = list.indexOf(ENV);
  return value;
}

const app = express();

app.disable('x-powered-by');
app.enable('trust proxy');

app.use(compression()); // gzip压缩
app.use(cookieParser());

app.use((req, res, next) => {
  // 禁用客户端的 MIME 类型嗅探行为
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
app.use(
  assetsServiceDir,
  express.static(path.join(appDirectory, assetsDir), {
    index: false,
  }),
);

// 把环境变量返回给前端
// 不推荐使用 _e
if (useCookieEnv) {
  app.use((req, res, next) => {
    const value = getEnv();
    if (!req.cookies._e || Number(req.cookies._e) !== value) {
      res.cookie('_e', value, {
        sameSite: 'lax',
      });
    }
    next();
  });
}

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

const envTemplate = (() => {
  const value = getEnv();
  const temp = `<script id="ns-inject">window.$$_e=${value};</script>`;
  return temp;
})();

// 挂载页面
app.get(baseRouter + '/*', (req, res) => {
  // 在html源代码中的第一个script前注入当前环境
  const htmlPath = path.posix.join(appDirectory, indexPath);
  const buffer = fs.readFileSync(htmlPath);
  const $ = cheerio.load(buffer);
  const scriptList = $('body script');
  if (scriptList && scriptList.length > 0) {
    $(scriptList[0]).before(envTemplate);
  } else {
    $('body').append(envTemplate);
  }

  if (injectHtml) {
    injectHtml($, req);
  }

  if (CSP) {
    res.setHeader('Content-Security-Policy', CSP);
  }

  res.send($.html());
});

// 异常捕获
// @ts-ignore
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status ?? 500).send(`${err}`);
  }
});

// 启动服务，监听端口
app.listen(port, () => {
  console.log(`🥛  server running at port: ${port}`);
});
