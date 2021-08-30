import { trimAll, makeListToObject } from '../src/format';

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
});
