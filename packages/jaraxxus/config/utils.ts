import fs from 'fs';
import path from 'path';

export function isBoolean(val: unknown): boolean {
  return Object.prototype.toString.call(val) === '[object Boolean]';
}

export function isUndefined(val: unknown): boolean {
  return Object.prototype.toString.call(val) === '[object Undefined]';
}

export function isString(val: unknown): boolean {
  return Object.prototype.toString.call(val) === '[object String]';
}

export function isArray(val: unknown): boolean {
  return Object.prototype.toString.call(val) === '[object Array]';
}

export function isObject(val: unknown): boolean {
  return Object.prototype.toString.call(val) === '[object Object]';
}

export const appDirectory = fs.realpathSync(process.cwd());

export const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

export const isExistFile = (url: string) => {
  try {
    const resolvedPath = resolveApp(url);
    return fs.existsSync(resolvedPath);
  } catch (error) {
    return false;
  }
};
