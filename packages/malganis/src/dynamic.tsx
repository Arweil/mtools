import * as React from 'react';
import type { IMalGanisApp } from './type';
import type { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import { $mobx } from 'mobx';

export default function dynamic(params: {
  app: IMalGanisApp;
  models?: () => Array<Promise<any>>;
  component: () => Promise<any>;
  fetchingComp?: React.ReactNode;
}) {
  const { app, models = () => [], component, fetchingComp } = params;

  const p = () =>
    new Promise<IReactComponent>((resolve, reject) => {
      Promise.all([component(), ...models()]).then(([resolvedComponent, ...modelList]) => {
        app._cacheRouteModalKey.forEach(key => {
          app.unmodule(key);
        });
        app._cacheRouteModalKey = [];
        modelList.forEach(item => {
          // 默认取 default，兼容一个文件写多个 model 的情况
          let modules = item.default || item;
          if (!Array.isArray(modules)) {
            // models: () => [
            //   import('@/pages/demoMulStore/moduleA'),
            //   import('@/pages/demoMulStore/moduleB'),
            // ],
            if (Object.getOwnPropertySymbols(modules).includes($mobx)) {
              modules = [modules];
            } else {
              // stores: export default { moduleA, moduleB }
              // models: () => [
              //   import('@/pages/demoMulStore/stores'),
              // ],
              modules = Object.values(modules);
            }
          }
          modules = modules.filter(m => {
            return Object.getOwnPropertySymbols(m).includes($mobx);
          });
          modules.forEach(m => {
            const namespace: string = m.namespace || (m.constructor && m.constructor.name);
            // 如果不存在key值
            if (!app._cacheRouteModalKey.includes(namespace)) {
              app._cacheRouteModalKey.push(namespace);
              app.model(m);
            }
          });
        });
        resolve(resolvedComponent.default || resolvedComponent);
      });
    });

  return class extends React.PureComponent<
    {},
    {
      FinComp: IReactComponent;
    }
  > {
    public isMount: boolean; // 防止在生命周期还没有触发 componentDidMount 的时候 setState

    constructor(props) {
      super(props);

      this.isMount = false;

      this.state = {
        FinComp: null,
      };

      p().then(resolvedComponent => {
        if (this.isMount) {
          this.setState({
            FinComp: resolvedComponent,
          });
        } else {
          // @ts-ignore
          this.state.FinComp = resolvedComponent;
        }
      });
    }

    componentDidMount() {
      this.isMount = true;
    }

    componentWillUnmount() {
      this.isMount = false;
    }

    render() {
      const { FinComp } = this.state;

      if (!FinComp) {
        const FetchingComponent: React.ReactNode = fetchingComp
          ? fetchingComp
          : app._fetchingComp
          ? app._fetchingComp
          : 'Loading...';
        return FetchingComponent;
      }

      return React.createElement(FinComp, null);
    }
  };
}
