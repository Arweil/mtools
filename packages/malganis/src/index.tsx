import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createHashHistory, createBrowserHistory, createMemoryHistory } from 'history';
import type { History, MemoryHistory } from 'history';
import { Provider } from 'mobx-react';
import type { IMalGanisApp, IMalGanisOpt } from './type';
import { isComputedProp, isObservableProp, toJS } from 'mobx';

function getProvider(params: {
  app: IMalGanisApp;
}) {
  const { app } = params;
  return (
    <Provider store={app._store}>
      { app._router }
    </Provider>
  );
}

function render(app: IMalGanisApp, container?: ReactDOM.Container) {
  if (!container) {
    return getProvider({ app });
  }

  return ReactDOM.render(getProvider({ app }), container);
}

function malganis<TypeOfStore extends { [key: string]: unknown; }>(options: Partial<IMalGanisOpt> = {}) {
  const app: IMalGanisApp = {
    _store: {},
    _cacheRouteModalKey: [],
  } as IMalGanisApp;

  // 默认为 hash history
  let history: History | MemoryHistory | null = null;
  const { type: historyType, ...historyOpt } = options.historyOptions;
  switch (historyType) {
    case 'browser':
      history = createBrowserHistory(historyOpt);
      break;
    case 'memory':
      history = createMemoryHistory(historyOpt);
      break;
    default:
      history = createHashHistory(historyOpt);
      break;
  }

  app.router = function router(fun: (params: { app: IMalGanisApp, history: History  }) => JSX.Element): void {
    app._router = fun({ app, history });
  };
  app.model = function modal(inst: any) {
    // 在压缩代码后，类名会被混淆，应该使用 namespace 变量
    const namespace: keyof TypeOfStore = inst.namespace || inst.constructor && inst.constructor.name;
    // 定义初始的 Observable 属性，用于数据还原
    inst.$$initialStates = {};
    inst.$$needResetStore = inst.$$needResetStore !== undefined ? (!!inst.$$needResetStore) : true;
    Object.getOwnPropertyNames(inst).forEach(propName => {
      if (
        isObservableProp(inst, propName)
        && !isComputedProp(inst, propName)
        && propName !== 'namespace'
        && propName !== '$$needResetStore'
      ) {
        inst.$$initialStates[propName] = toJS(inst[propName]);
      }
    });
    app._store[namespace] = inst;
  };
  app.unmodule = function unmodule(namespace: string) {
    const { $$initialStates, $$needResetStore } = app._store[namespace] as {
      $$initialStates: { [key: string]: unknown; };
      $$needResetStore: boolean;
    };
    // 如果需要重置
    if ($$needResetStore) {
      Object.entries($$initialStates).forEach(([key, value]) => {
        app._store[namespace][key] = value;
      });
    }

    Reflect.deleteProperty(app._store, namespace);
  };

  function start(): JSX.Element;
  function start(container: ReactDOM.Container): void;
  function start(container?: ReactDOM.Container) {
    if (!app._router) {
      console.error(`you must call 'router' method before 'start'`);
    }
    return render(app, container);
  };

  app.start = start;

  return app;
}

export default malganis;
