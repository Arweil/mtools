import { simple2Tree } from '../src/index';

describe('tree', () => {
  test('simple2Tree', () => {
    const data = [
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

    expect(simple2Tree({ simpleData: data, pIdStart: 0 })).toEqual(
      [
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
    )
  })
});
