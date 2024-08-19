import { ConfigProviderExt } from '@m-tools/antd-ext';
import React from 'react';
import App from './baseApi';

export default () => {
  ConfigProviderExt.config({
    themeExt: 'hermes', // 不设置默认hermes
    prefixCls: 'test', // 此处用于设置静态方法调用时的 prefixCls
  });

  return (
    // 此处 prefixCls 用于修改全局样式
    <ConfigProviderExt>
      <App />
    </ConfigProviderExt>
  );
};
