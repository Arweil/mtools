import { userStore } from '@/stores';
import { ConfigProviderExt, locale } from '@m-tools/antd-ext';
import malganis from 'malganis';
import React from 'react';
import { AliveScope } from 'react-activation';
import RegisterRouter from './routers';

function LoadingComponent(): React.ReactNode {
  return;
}

const app = malganis({
  historyOptions: {
    type: 'browser',
    basename: window.__POWERED_BY_QIANKUN__ ? '/app-name' : undefined,
  },
  fetchingComp: LoadingComponent,
});

app.model(userStore);

app.router(RegisterRouter);

export default function App(): JSX.Element {
  return (
    <AliveScope>
      <ConfigProviderExt locale={locale.zh_CN} themeExt="hermes">
        {app.start()}
      </ConfigProviderExt>
    </AliveScope>
  );
}
