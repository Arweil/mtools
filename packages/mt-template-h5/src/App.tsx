import 'normalize.css';
import React from 'react';
import { ConfigProvider } from 'antd-mobile';
import 'antd-mobile/es/global';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import '@/style/index.less';
import RegisterRouter from './routers';
import GlobalContext from './store';

export default function App(): JSX.Element {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalContext.Provider value={{}}>
        <RegisterRouter />
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}
