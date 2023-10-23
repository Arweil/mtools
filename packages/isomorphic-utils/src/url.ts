/**
 * 解析URL，返回Query参数
 *
 * @export
 * @template T
 * @param {string} fullPath
 * @returns {T}
 */
export function getURLParams<T = { [key: string]: string }>(fullPath: string): T {
  if (!fullPath.includes('?')) {
    return {} as T;
  }

  const [, ...search] = fullPath.split('?');
  return Object.fromEntries(
    search
      .join('')
      .split('&')
      .map(item => item.split('=')),
  );
}

/**
 * 把对象改为URL Search类型
 *
 * @export
 * @param {({ [key: string]: string | boolean | number | undefined | null })} params
 * @returns
 */
export function makeURLParams(params: {
  [key: string]: string | boolean | number | undefined | null;
}) {
  return Object.entries(params)
    .filter(item => {
      const [, value] = item;
      return value !== undefined && value !== null;
    })
    .map(item => {
      const [key, value] = item;
      return `${key}=${value}`;
    })
    .join('&');
}

/**
 * 在url中添加参数
 *
 * @export
 * @param {string} url
 * @param {({ [key: string]: string | boolean | number | undefined | null })} params
 * @returns
 */
export function addURLParams(
  url: string,
  params: { [key: string]: string | boolean | number | undefined | null },
) {
  const allParams = getURLParams(url);

  let domain = '';
  if (url.includes('?')) {
    domain = url.split('?')[0];
    return `${domain}?${makeURLParams({ ...allParams, ...params })}`;
  }

  return `${url}?${makeURLParams(params)}`;
}
