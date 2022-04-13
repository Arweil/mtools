/**
 * 传入一个路径，返回一个数组 openKeys
 * /A/B/C => ['/A', '/A/B', '/A/B/C']
 * @param {string} path
 * @param {boolean | undefined} needLastOne openkeys 往往不需要最后一项
 * @returns {string[]}
 */
export function getFullPath(path: string, needLastOne?: boolean): string[] {
  const list = path.split('/').filter((i) => i);
  const result = list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`);
  if (needLastOne) {
    return result;
  }
  return result.slice(0, result.length - 1);
}

/**
 * 获取选中的菜单key
 * pathname: /A/B/C, 菜单项: ['/A/B', '/A/C'], 返回 /A/B
 * @param {string} path window.location.pathname
 * @param {string[]} menuURLs 菜单项key列表
 * @returns {string}
 */
export function getSelectedMenu(path: string, menuURLs: string[]): string {
  const paths = getFullPath(path, true).reverse();
  return paths.find((item) => menuURLs.includes(item)) || '';
}
