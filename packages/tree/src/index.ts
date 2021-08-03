export interface IBaseSimpleTreeData {
  [key: string]: any;
}

export interface IBaseTreeNode<T> {
  children: IBaseTreeNode<T>[];
  [key: string]: any;
}

/**
 * 简单格式的数据转换为树形结构
 */
function simple2Tree<T extends IBaseSimpleTreeData>(data: {
  simpleData: T[];
  pIdKey?: string;
  idKey?: string;
  pIdStart?: number | string;
}) {
  const {
    simpleData = [],
    pIdKey = 'pId',
    idKey = 'id',
    pIdStart = 0,
  } = data;

  const result: any[] = [];
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
function tree2Simple() {
}

/**
 * 以层序遍历打平树结构
 * @param tree 
 * @returns 所有结点的数组
 */
function levelOrder<T>(tree: IBaseTreeNode<T>) {
  if (tree === null) {
    return [];
  }

  const res = [];
  let stack = [tree];
  while (stack.length) {
    const item = stack.shift();
    if (item && item.children && item.children.length > 0) {
      stack = [...stack, ...item.children];
    }

    item && res.push(item);
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
  tree: IBaseTreeNode<T>,
  callback: (treeNode: IBaseTreeNode<T>) => void,
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
