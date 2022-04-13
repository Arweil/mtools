import { getFullPath, getSelectedMenu } from "../src/menu";

describe('menu', () => {
  test('getFullPath', () => {
    expect(getFullPath('/A/B/C', true)).toEqual(['/A', '/A/B', '/A/B/C']);
    expect(getFullPath('/A/B/C')).toEqual(['/A', '/A/B']);
    expect(getFullPath('A')).toEqual([]);
  });

  test('getSelectedMenu', () => {
    expect(getSelectedMenu('/A/B/C', ['/A/B', '/A/C'])).toEqual('/A/B');
    expect(getSelectedMenu('/A/B', ['/A/B', '/A/C'])).toEqual('/A/B');
    expect(getSelectedMenu('/A/B', ['/A/C'])).toEqual('');
  });
});
