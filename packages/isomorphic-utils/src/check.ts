/**
 * 判断运行时环境
 * @returns {('node' | 'browser' | 'unknow')}
 */
function checkRuntimeEnv(): 'node' | 'browser' | 'unknow' {
  let env: 'node' | 'browser' | 'unknow';
  if (typeof window !== 'undefined') {
    env = 'browser';
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    env = 'node';
  }

  return env;
}

/**
 * 根据User-Agent判断客户端类型
 * @export
 * @param {string} UA
 * @returns {('douyin' | 'weapp' | 'wechat' | 'browser')}
 */
function checkBrowserType(UA: string): 'douyin' | 'weapp' | 'wxwork' | 'wechat' | 'browser' {
  if (/BytedanceWebview/i.exec(UA)) {
    return 'douyin'; // 抖音
  }
  if (/miniprogram/i.exec(UA)) {
    return 'weapp'; // 微信小程序
  }
  if (/wxwork/i.exec(UA)) {
    return 'wxwork'; // 企业微信
  }
  if (/MicroMessenger/i.exec(UA)) {
    return 'wechat'; // 微信
  }
  return 'browser'; // 普通浏览器
};

export {
  checkRuntimeEnv,
  checkBrowserType,
}
