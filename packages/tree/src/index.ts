export interface IBaseSimpleTreeData<T> {
  [key: string]: any;
}

export interface IBaseTreeNode<T> {
  children: T;
  [key: string]: any;
}

/**
 * 简单格式的数据转换为树形结构
 */
function simple2Tree<T extends IBaseSimpleTreeData<T>>(data: {
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

export {
  simple2Tree,
  tree2Simple,
}
