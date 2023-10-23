/**
 * 获取node环境变量，会做一些兼容性处理
 *
 * @export
 * @param {string} envName
 * @param {string} defaultValue
 * @returns
 */
export function getNodeEnv(envName: string, defaultValue: string) {
  const env = process.env[envName];
  // 有些服务器对没有响应环境变量的值返回undefined 或者 'undefined'
  return env === 'undefined' || env === undefined ? defaultValue : env;
}
