/**
 * 移除字符串中所有空格
 * @param {string} str 需要处理的字符串
 * @returns
 */
function trimAll(str: string): string {
  return str.replace(/\s/g, '');
}

/**
 * 格式化一个数组为一个对象，根据数组的key字段和value字段
 * @template T 数组对象类型
 * @param {T[]} arr
 * @param {keyof T} key
 * @param {keyof T} value
 * @returns
 */
function makeListToObject<T = any>(arr: T[], key: keyof T, value: keyof T) {
  const obj = Object.create(null);
  arr.forEach(item => {
    obj[item[key]] = item[value];
  });
  return obj;
}

function formatMoney() {}

function resetMoney() {}

function formatBankAccountNum() {}

function resetBankAccountNum() {}

export {
  trimAll,
  makeListToObject,
}
