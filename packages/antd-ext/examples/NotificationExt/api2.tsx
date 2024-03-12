import { ConfigProviderExt } from '@m-tools/antd-ext';
import React from 'react';
import App from './baseApi';

export default () => {
  ConfigProviderExt.config({
    holderRender: children => (
      <ConfigProviderExt prefixCls="test" themeExt="hermes">
        {children}
      </ConfigProviderExt>
    ),
  });

  return <App />;
};
