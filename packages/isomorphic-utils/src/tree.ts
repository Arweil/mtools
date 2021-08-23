export interface IBaseSimpleTreeData {
  [key: string]: any;
}

export type typeBaseTreeNode<T> = T & { children: typeBaseTreeNode<T>[] };

/**
 * 简单格式的数据转换为树形结构
 */
function simple2Tree<T extends IBaseSimpleTreeData>(data: {
  simpleData: T[];
  pIdKey?: string;
  idKey?: string;
  pIdStart?: number | string;
}): typeBaseTreeNode<T>[] {
  const {
    simpleData = [],
    pIdKey = 'pId',
    idKey = 'id',
    pIdStart = 0,
  } = data;

  const result: typeBaseTreeNode<T>[] = [];
  // 遍历所有元素
  for (const treeItem of simpleData) {
    // 获取子集元素
    if (treeItem[pIdKey] === pIdStart) {
      result.push({
        ...treeItem,
        // 获取当前id的子元素
        children: simple2Tree({
          simpleData,
          pIdKey,
          idKey,
          pIdStart: treeItem[idKey],
        }),
      });
    }
  }
  return result;
}

/**
 * 树形结构的数据转换为简单的数据格式
 */
function tree2Simple<T>(data: {
  tree: typeBaseTreeNode<T>;
  pIdKey?: string;
  idKey?: string;
}): T[] {
  const { tree, pIdKey = 'pId', idKey = 'id' } = data;
  if (tree === null) {
    return [];
  }

  const res: T[] = [];
  if (tree[idKey] === undefined) {
    tree[idKey] = 0;
  } 
  let stack = [tree];
  while (stack.length) {
    const item = stack.shift();
    if (item && item.children && item.children.length > 0) {
      stack = [
        ...stack,
        ...item.children.map((citem, index) => {
          return {
            ...citem,
            [pIdKey]: citem[pIdKey] !== undefined ? citem[pIdKey] : citem[idKey],
            [idKey]: citem[idKey] !== undefined ? citem[idKey] : `${citem[idKey]}_${index}}`,
          }
        }),
      ] as typeBaseTreeNode<T>[];
    }

    if (item) {
      Reflect.deleteProperty(item, 'children');
      res.push(item);
    }
  }

  return res;
}

/**
 * 以层序遍历打平树结构
 * @param tree 
 * @returns 所有结点的数组
 */
function levelOrder<T>(tree: typeBaseTreeNode<T>): T[] {
  if (tree === null) {
    return [];
  }

  const res = [];
  let stack = [tree];
  while (stack.length) {
    const item = stack.shift();
    if (item && item.children && item.children.length > 0) {
      stack = [...stack, ...item.children] as typeBaseTreeNode<T>[];
    }

    if (item) {
      Reflect.deleteProperty(item, 'children');
      res.push(item);
    }
  }

  return res;
}

/**
 * 遍历树，可以用callback获取，操作每一个结点
 * @param tree 树
 * @param callback 执行函数
 * @returns undefined
 */
function forEachTree<T>(
  tree: typeBaseTreeNode<T>,
  callback: (treeNode: typeBaseTreeNode<T>) => void,
) {
  if (tree === null) {
    return;
  }

  callback(tree);
  if (tree.children && tree.children.length > 0) {
    tree.children.forEach(item => {
      forEachTree(item, callback);
    });
  }
}

export {
  simple2Tree,
  tree2Simple,
  levelOrder,
  forEachTree,
}
