import { Result } from '@m-tools/antd-ext';
import React from 'react';

export default function Forbidden(): JSX.Element {
  return <Result status="403" title="403-APP2" subTitle="抱歉，您没有访问此资源的权限" />;
}
