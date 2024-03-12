import { ConfigProviderExt } from '@m-tools/antd-ext';
import React from 'react';
import App from './baseApi';

export default () => {
  ConfigProviderExt.config({
    prefixCls: 'test', // 此处用于设置静态方法调用时，用于给自定义样式注入 prefixCls
    // 此处 prefixCls 用于修改全局样式
    holderRender: children => (
      <ConfigProviderExt prefixCls="test" themeExt="hermes">
        {children}
      </ConfigProviderExt>
    ),
  });

  return <App />;
};
