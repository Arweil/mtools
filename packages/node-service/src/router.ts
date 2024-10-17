import * as cheerio from 'cheerio';
import type { Express } from 'express';
import fs from 'fs';
import path from 'path';
import proxy from './proxy';
import { appDirectory, getConfig, getEnv } from './utils';

export function router(app: Express) {
  const config = getConfig();
  const { baseRouter, indexPath, CSP, apis, injectHtml } = config;

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
}
