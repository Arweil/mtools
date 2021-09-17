/**
 * 子页面中的路由配置
 */

import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

function RoutesConf() {
  return (
    <ScrollToTop selectors=".content-scroll">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/" />
          </Route>
          <Route path="/demo" component={React.lazy(() => import('@/pages/demo'))} />
          <Route path="/500" component={React.lazy(() => import('@/errorPages/Error'))} />
          <Route path="/403" component={React.lazy(() => import('@/errorPages/Forbidden'))} />
          <Route path="/*" component={React.lazy(() => import('@/errorPages/NotFoundPage'))} />
        </Switch>
      </Suspense>
    </ScrollToTop>
  );
}

export default RoutesConf;
