import { checkBrowserType, checkRuntimeEnv } from '../src/check';

// 企业微信
const WxWorkUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 wxwork/3.1.13 MicroMessenger/7.0.1 Language/zh ColorScheme/Light';
// 微信客户端，公众号
const WxUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.12(0x18000c25) NetType/4G Language/zh_CN';
// 微信小程序
const WxAppUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.12(0x18000c25) NetType/4G Language/zh_CN miniProgram';
// iphone chrome
const iphoneChromeUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/92.0.4515.90 Mobile/15E148 Safari/604.1';

describe('check', () => {
  test('checkRuntimeEnv', () => {
    expect(checkRuntimeEnv()).toEqual('node');
  });

  test('checkBrowserType', () => {
    expect(checkBrowserType(WxWorkUserAgent)).toEqual('wxwork');
    expect(checkBrowserType(WxUserAgent)).toEqual('wechat');
    expect(checkBrowserType(WxAppUserAgent)).toEqual('weapp');
    expect(checkBrowserType(iphoneChromeUserAgent)).toEqual('browser');
  });
});
