import React from 'react';
import { ConfigProviderExt, ProSearchTable, locale } from '@m-tools/antd-ext';

export default function ProSearchTableExp() {
  return (
    <ConfigProviderExt locale={locale.zh_CN} themeExt="hermes">
      <ProSearchTable />
    </ConfigProviderExt>
  );
}
