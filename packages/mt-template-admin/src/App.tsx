import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import malganis from 'malganis';
import { userStore } from '@/stores';
import RegisterRouter from './routers';

const app = malganis({
  historyOptions: {
    type: 'browser',
  },
});

app.model(userStore);

app.router(RegisterRouter);

export default function App(): JSX.Element {
  return (
    <ConfigProvider
      locale={zhCN}
    >
      {app.start()}
    </ConfigProvider>
  );
}
