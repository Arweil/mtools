import { cookieToMap, mapToCookieStr } from '../src/cookie';

const cookieStr = 'BIDUPSID=38111F183F7E8F33ED4B1ECD3D61995A; PSTM=1578919649; MCITY=-289%3A; sugstore=1; BDUSS=DI2clhiRUxkZDNabC1hQ2phLVhvM1hjR1dxYVIxeWVSZk9DN2pMMElicTdON05mSVFBQUFBJCQAAAAAAAAAAAEAAADcY20mxLrI1cfv6eQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALuqi1-7qotfa';

const cookieMap = new Map([
  ['BIDUPSID', '38111F183F7E8F33ED4B1ECD3D61995A'],
  ['PSTM', '1578919649'],
  ['MCITY', '-289%3A'],
  ['sugstore', '1'],
  ['BDUSS', 'DI2clhiRUxkZDNabC1hQ2phLVhvM1hjR1dxYVIxeWVSZk9DN2pMMElicTdON05mSVFBQUFBJCQAAAAAAAAAAAEAAADcY20mxLrI1cfv6eQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALuqi1-7qotfa'],
])

describe('cookie', () => {
  test('cookieToMap', () => {
    expect(cookieToMap()).toEqual(new Map());
    expect(cookieToMap(cookieStr)).toEqual(cookieMap);
  });

  test('mapToCookieStr', () => {
    expect(mapToCookieStr(new Map())).toEqual('');
    expect(mapToCookieStr(cookieMap)).toEqual(cookieStr);
  });
});
