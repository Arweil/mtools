import { Result } from '@m-tools/antd-ext';
import React from 'react';

export default function NotFoundPage(): JSX.Element {
  return <Result status="404" title="404-APP2" subTitle="抱歉，您访问的资源不存在" />;
}
