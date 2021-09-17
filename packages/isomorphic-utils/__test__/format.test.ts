import { trimAll, makeListToObject, pickFromObj } from '../src/format';

describe('cookie', () => {
  test('trimAll', () => {
    expect(trimAll('  Hello World !   ')).toEqual('HelloWorld!');
  });

  test('makeListToObject', () => {
    expect(makeListToObject([
      { code: 'codeA', name: 'nameA' },
      { code: 'codeB', name: 'nameB' },
    ], 'code', 'name')).toEqual({
      codeA: 'nameA',
      codeB: 'nameB',
    });
  });

  test('pickFromObj', () => {
    expect(pickFromObj({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
    }, ['a', 'c', 'g'])).toEqual({
      a: 1,
      c: 3,
    });
  })
});
