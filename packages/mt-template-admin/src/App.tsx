import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import malganis from 'malganis';
import { userStore } from '@/stores';
import RegisterRouter from './routers';

function LoadingComponent(): React.ReactNode {
  return 'App Fetching Loading...';
}

const app = malganis({
  historyOptions: {
    type: 'browser',
  },
  fetchingComp: LoadingComponent,
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
