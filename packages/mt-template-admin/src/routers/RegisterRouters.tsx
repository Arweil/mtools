import React from 'react';
import dynamic from 'malganis/dynamic';
import type { History, IMalGanisApp } from 'malganis/lib/type';
import {
  Router,
  Switch,
  Route,
  Redirect,
} from 'malganis/router';
import AppLayoutWrapper from '@/layout/AppLayoutWrapper';
import ScrollToTop from '@/routers/ScrollToTop';

const RegisterRouter = ({ app, history }: {
  app: IMalGanisApp;
  history: History<unknown>;
}): JSX.Element => (
  <Router history={history}>
    <Switch>
      {/* <Route
        path="/login"
        component={dynamic({
          app,
          component: () => import('@/login'),
        })}
      /> */}
      <AppLayoutWrapper>
        <ScrollToTop selectors="content-scroll">
          <Switch>
            <Route exact path="/">
              <Redirect to="/" />
            </Route>
            <Route
              path="/demo/demo"
              component={dynamic({
                app,
                component: () => import('@/pages/demo'),
                models: () => [
                  import('@/pages/demo/DemoStore'),
                ],
              })}
            />
            <Route
              path="/demo/demoA"
              component={dynamic({
                app,
                component: () => import('@/pages/demoA'),
                models: () => [
                  import('@/pages/demoA/DemoStoreA'),
                  import('@/pages/demoA/DemoStoreB'),
                ],
              })}
            />
            <Route
              path="/500"
              component={dynamic({
                app,
                component: () => import('@/errorPages/Error'),
              })}
            />
            <Route
              path="/403"
              component={dynamic({
                app,
                component: () => import('@/errorPages/Forbidden'),
              })}
            />
            <Route
              path="/*"
              component={dynamic({
                app,
                component: () => import('@/errorPages/NotFoundPage'),
              })}
            />
          </Switch>
        </ScrollToTop>
      </AppLayoutWrapper>
    </Switch>
  </Router>
);

export default RegisterRouter;
