import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import malganis from 'malganis';
import dynamic from 'malganis/dynamic';
import {
  Router,
  Switch,
  Route,
  Redirect,
} from 'malganis/router';
import AppLayoutWrapper from '@/layout/AppLayoutWrapper';
import { userStore, routerStore } from '@/stores';
import ScrollToTop from '@/routers/ScrollToTop';

const app = malganis({
  historyOptions: {
    type: 'browser',
  },
});

app.model(routerStore);
app.model(userStore);

app.router(({ app: _app, history }) => (
  <Router history={history}>
    <Switch>
      <Route
        path="/login"
        component={dynamic({
          app: _app,
          component: () => import('@/login'),
        })}
      />
      <AppLayoutWrapper>
        <ScrollToTop selectors="content-scroll">
          <Switch>
            <Route exact path="/">
              <Redirect to="/" />
            </Route>
            <Route
              path="/demo"
              component={dynamic({
                app: _app,
                component: () => import('@/pages/demo'),
              })}
            />
            <Route
              path="/500"
              component={dynamic({
                app: _app,
                component: () => import('@/errorPages/Error'),
              })}
            />
            <Route
              path="/403"
              component={dynamic({
                app: _app,
                component: () => import('@/errorPages/Forbidden'),
              })}
            />
            <Route
              path="/*"
              component={dynamic({
                app: _app,
                component: () => import('@/errorPages/NotFoundPage'),
              })}
            />
          </Switch>
        </ScrollToTop>
      </AppLayoutWrapper>
    </Switch>
  </Router>
));

export default function App(): JSX.Element {
  return (
    <ConfigProvider
      locale={zhCN}
    >
      {app.start()}
    </ConfigProvider>
  );
}
