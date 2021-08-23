import { cloneInDeep } from '../src/clone';
import { simple2Tree, tree2Simple, levelOrder, forEachTree } from '../src/tree';

const simpleData = [
  {
    id: 1633,
    pId: 0,
    name: 'top level'
  },
  {
    id: 1634,
    pId: 1633,
    name: 'second level 1'
  },
  {
    id: 1635,
    pId: 1633,
    name: 'second level 2'
  },
  {
    id: 1636,
    pId: 1635,
    name: 'third level 1'
  }
];

const treeData = {
  id: 1633,
  pId: 0,
  name: 'top level',
  children: [
    {
      id: 1634,
      pId: 1633,
      name: 'second level 1',
      children: [],
    },
    {
      id: 1635,
      pId: 1633,
      name: 'second level 2',
      children: [
        {
          id: 1636,
          pId: 1635,
          name: 'third level 1',
          children: [],
        }
      ]
    },
  ]
};


describe('tree', () => {
  test('simple2Tree', () => {
    expect(simple2Tree<{ id: number; pId: number; name: string; }>({
      simpleData: cloneInDeep(simpleData),
      pIdStart: 0
    })).toEqual([cloneInDeep(treeData)])
  });

  test('tree2Simple', () => {
    expect(tree2Simple<{ id: number; pId: number; name: string; }>({ tree: cloneInDeep(treeData) })).toEqual(cloneInDeep(simpleData));
  });

  test('levelOrder, forEachTree', () => {
    const copyTreeData = cloneInDeep(treeData);
    forEachTree(copyTreeData, (item) => { item.name = `rename: ${item.name}` });
    expect(levelOrder(copyTreeData).map(item => item.name)).toEqual([
      'rename: top level',
      'rename: second level 1',
      'rename: second level 2',
      'rename: third level 1',
    ])
  })
});
