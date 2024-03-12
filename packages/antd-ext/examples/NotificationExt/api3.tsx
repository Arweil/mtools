import { ConfigProviderExt, notification, notificationExt } from '@m-tools/antd-ext';
import React from 'react';
import App from './baseApi';

['success', 'error', 'warning', 'info'].forEach(
  (type: 'success' | 'error' | 'warning' | 'info') => {
    notificationExt[type] = notificationExt.api(notification, type, 'test');
  },
);

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
