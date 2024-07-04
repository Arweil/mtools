/* eslint-disable react/jsx-props-no-spreading */
import AppLayoutWrapper from '@/layout/AppLayoutWrapper';
import ScrollToTop from '@/routers/ScrollToTop';
import dynamic from 'malganis/dynamic';
import type { History, IMalGanisApp } from 'malganis/lib/type';
import { Redirect, Route, RouteComponentProps, Router, Switch } from 'malganis/router';
import React, { useMemo } from 'react';
import KeepAlive from 'react-activation';

export type KeepAliveHOCProps = {
  app: IMalGanisApp;
  component: () => Promise<any>;
  fetchingComp?: React.ReactNode;
  models?: (() => Promise<any>[]) | undefined;
} & RouteComponentProps;

function DynamicComponent(props: KeepAliveHOCProps) {
  const { app, component, fetchingComp, models, ...p } = props;

  const D = useMemo(
    () =>
      dynamic({
        app,
        component,
        models,
        fetchingComp,
      }),
    [app, component, fetchingComp, models],
  );

  return <D {...p} />;
}

function DynamicComponentKP(props: KeepAliveHOCProps) {
  const { location } = props;

  const k = location.pathname;

  return (
    <KeepAlive id={k} name={k}>
      <DynamicComponent {...props} />
    </KeepAlive>
  );
}

function appRoutes(props: { app: IMalGanisApp }) {
  const { app } = props;

  return (
    <ScrollToTop selectors="content-scroll">
      <Switch>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route
          path="/Demo/DemoSingleStore"
          component={React.memo((p: RouteComponentProps) => (
            <DynamicComponentKP
              app={app}
              component={() => import('@/pages/demoStore')}
              models={() => [import('@/pages/demoStore/Store')]}
              {...p}
            />
          ))}
        />
        <Route
          path="/Demo/DemoMulStore"
          component={(p: RouteComponentProps) => (
            <DynamicComponentKP
              app={app}
              component={() => import('@/pages/demoMulStore')}
              models={() => [
                import('@/pages/demoMulStore/stores/DemoStoreA'),
                import('@/pages/demoMulStore/stores/DemoStoreB'),
              ]}
              {...p}
            />
          )}
        />
        <Route
          path="/Demo/DemoNoStore"
          component={(p: RouteComponentProps) => (
            <DynamicComponentKP app={app} component={() => import('@/pages/demoNoStore')} {...p} />
          )}
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
  );
}

const RegisterRouter = ({
  app,
  history,
}: {
  app: IMalGanisApp;
  history: History<unknown>;
}): JSX.Element => (
  <Router history={history}>
    <Switch>
      {window.__POWERED_BY_QIANKUN__ ? (
        appRoutes({ app })
      ) : (
        <AppLayoutWrapper>{appRoutes({ app })}</AppLayoutWrapper>
      )}
    </Switch>
  </Router>
);

export default RegisterRouter;
