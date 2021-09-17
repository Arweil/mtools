import React, { PureComponent, Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { History, Location, createBrowserHistory, UnregisterCallback } from 'history';
import { routerStore } from '@/stores';

export default class Root extends PureComponent {
  private history: History<History>;
  private unHistoryListen: UnregisterCallback | null;
  private initialLocation: Location;
  private currentLocation: Location;

  constructor(props: Readonly<{}>) {
    super(props);

    this.history = createBrowserHistory();
    this.unHistoryListen = null;

    const { prevLocation, currentLocation } = routerStore
    this.initialLocation = prevLocation;
    this.currentLocation = currentLocation;
  }

  componentDidMount() {
    this.unHistoryListen = this.history.listen((location) => {
      if (!this.initialLocation) {
        this.initialLocation = location;
        this.currentLocation = location;
      } else {
        this.initialLocation = { ...this.currentLocation };
        this.currentLocation = { ...location };
      }

      routerStore.onLocationChange(this.initialLocation, this.currentLocation);
    });
  }

  componentWillUnmount() {
    this.unHistoryListen && this.unHistoryListen();
  }

  render() {
    return (
      <Router history={this.history}>
        <Suspense fallback={<div>111</div>}>
          {/* 页面级别路由 */}
          <Switch>
            <Route path="/login" component={React.lazy(() => import('@/login'))} />

            {this.props.children}
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
