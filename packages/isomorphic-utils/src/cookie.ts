/**
 * cookie 字符串映射为 map 对象
 *
 * @param {string} [cookieStr='']
 * @returns
 */
function cookieToMap(cookieStr: string = '') {
  const map = new Map<string, string>();
  if (!cookieStr) {
    return map;
  }

  cookieStr.split(';')
    .forEach(item => {
      const [key, value] = item.split('=');
      map.set(key.trim(), value.trim());
    });

  return map;
}

/**
 * 把 map 对象转化为一个 cookie 字符串
 *
 * @param {Map<string, string>} cookieMap
 * @returns
 */
function mapToCookieStr(cookieMap: Map<string, string>) {
  if ([...cookieMap].length === 0) {
    return '';
  }

  let cookieStr = '';
  for (const [key, value] of cookieMap) {
    cookieStr += `${key}=${value}; `
  }
  return cookieStr.slice(0, cookieStr.length - 2);
}

export {
  cookieToMap,
  mapToCookieStr,
}
