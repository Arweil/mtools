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
              path="/Demo/DemoBaseCom/ThirdPage"
              component={dynamic({
                app,
                component: () => import('@/pages/demoBaseCom/ThirdPage'),
              })}
            />
            <Route
              path="/Demo/DemoBaseCom"
              component={dynamic({
                app,
                component: () => import('@/pages/demoBaseCom'),
                models: () => [
                  import('@/pages/demoBaseCom/DemoStore'),
                ],
              })}
            />
            <Route
              path="/Demo/DemoMulStore"
              component={dynamic({
                app,
                component: () => import('@/pages/demoMulStore'),
                models: () => [
                  import('@/pages/demoMulStore/stores/DemoStoreA'),
                  import('@/pages/demoMulStore/stores/DemoStoreB'),
                ],
                // models: () => [
                //   import('@/pages/demoMulStore/stores'),
                // ],
              })}
            />
            <Route
              path="/Demo/DemoNoStore"
              component={dynamic({
                app,
                component: () => import('@/pages/demoNoStore'),
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
