import React from 'react';
import { Result } from 'antd';

export default function Forbidden(): JSX.Element {
  return <Result status="403" title="403" subTitle="抱歉，您没有访问此资源的权限" />;
}
