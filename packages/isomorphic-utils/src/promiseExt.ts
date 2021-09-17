/**
 * 只返回最后一个 Promise 的执行结果，之前的 Promise 统一返回 cancel，可用于搜索
 *
 * @export
 * @template T
 * @returns
 */
export function getLastPromise<T = any>() {
  let lastFetchId = 0;
  return async (callback: () => Promise<T>) => {
    lastFetchId += 1;
    const fetchId = lastFetchId;
    const res = await callback();
    if (lastFetchId === fetchId) {
      return res;
    }

    return 'cancel';
  }
}
