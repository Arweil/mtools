import { simple2Tree, levelOrder } from '../src/index';

const simpleData = [
  {
    id: 1634,
    pId: 1633,
    name: 'second level 1'
  },
  {
    id: 1633,
    pId: 0,
    name: 'top level'
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

const treeData = [
  {
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
  },
]


describe('tree', () => {
  test('simple2Tree', () => {
    expect(simple2Tree({ simpleData: simpleData, pIdStart: 0 })).toEqual(treeData)
  });

  test('levelOrder', () => {
    expect(levelOrder(treeData[0]).map(item => item.name)).toEqual([
      'top level',
      'second level 1',
      'second level 2',
      'third level 1'
    ]);
  })
});
