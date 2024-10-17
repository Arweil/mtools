import compressible from 'compressible';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import type { Express } from 'express';
import express from 'express';
import path from 'path';
import { appDirectory, getConfig, getEnv } from './utils';

function middleware(app: Express) {
  const { assetsServiceDir, assetsDir, useCookieEnv, gzip } = getConfig();

  app.disable('x-powered-by');
  app.enable('trust proxy');

  app.use(
    compression({
      filter: (req, res) => {
        const type = res.getHeader('Content-Type') as string;

        if (
          type === undefined ||
          !compressible(type) ||
          (gzip?.exclude ?? []).some(itm => type.includes(itm))
        ) {
          return false;
        }

        return true;
      },
    }),
  );
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
}

export default middleware;
