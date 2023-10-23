import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

const RegisterRouter = (): JSX.Element => (
  <Router history={browserHistory}>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/Demo" />
        </Route>
        <Route exact path="/Demo" component={React.lazy(() => import('@/pages/Demo'))} />
        <Route exact path="/Demo1" component={React.lazy(() => import('@/pages/Demo1'))} />
      </Switch>
    </React.Suspense>
  </Router>
);

export default RegisterRouter;
