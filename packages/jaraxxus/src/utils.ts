import fs from 'fs';
import path from 'path';
import net from 'net';

export function isBoolean(val: any): val is boolean {
  return Object.prototype.toString.call(val) === '[object Boolean]'
}

export function isUndefined(val: any): val is undefined {
  return Object.prototype.toString.call(val) === '[object Undefined]';
}

export function isString(val: any): val is string {
  return Object.prototype.toString.call(val) === '[object String]';
}

export function isArray<T>(val: any): val is Array<T> {
  return Object.prototype.toString.call(val) === '[object Array]';
}

export function isObject<T>(val: any): val is T {
  return Object.prototype.toString.call(val) === '[object Object]';
}

export function mergeBooleanVal(defaultVal, newVal) {
  return isBoolean(newVal) ? newVal : !!newVal ? !!newVal : defaultVal
}

const appDirectory = fs.realpathSync(process.cwd());

export const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

export function portInUse(port: string) {
  return new Promise((resolve, reject) => {
    let server = net.createServer().listen(port, '0.0.0.0');
    server.on('listening', function () {
      server.close();
      resolve(port);
    });
    server.on('error', function (err) {
      if (err.code == 'EADDRINUSE') {
        reject(err);
      }
    });
  });
}
