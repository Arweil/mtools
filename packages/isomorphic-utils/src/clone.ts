/**
 * 实现深拷贝，支持 string、number、undefined、boolean、null、object、array类型
 *
 * @export
 * @template T
 * @param {T} data
 * @returns {T}
 */
export function cloneInDeep<T = any>(data: T, hash = new WeakMap<any, T>()): T {
  // 处理循环引用
  if (hash.get(data)) {
    return hash.get(data);
  }

  // string、number、undefined、boolean、null
  if (typeof data !== 'object' || Object.prototype.toString.call(data) === '[object Null]') {
    return data;
  }

  // array
  if (Array.isArray(data)) {
    return data.map(item => {
      return cloneInDeep(item);
    });
  }

  // object
  if (Object.prototype.toString.call(data) === '[object Object]') {
    const result: T = {} as T;

    hash.set(data, data);
    Object.keys(data).forEach((item) => {
      const value = data[item];
      result[item] = cloneInDeep(value, hash);
    });

    return result;
  }
}
