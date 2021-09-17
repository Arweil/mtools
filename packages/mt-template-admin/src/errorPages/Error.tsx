import React from 'react';
import { Result } from 'antd';

export default function Error() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉，服务发生了异常"
    />
  )
}
