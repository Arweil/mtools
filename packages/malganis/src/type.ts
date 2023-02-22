import type { BrowserHistoryBuildOptions, History } from 'history';

export type { History } from 'history';

export interface IMalGanisOpt {
  historyOptions: {
    type: 'browser' | 'hash' | 'memory'
  } & BrowserHistoryBuildOptions;
  useReactContextMode: boolean;
  fetchingComp: React.ReactNode;
}

export interface IMalGanisModalObj {
  namespace: string;
  state?: { [key: string]: any; };
  computeds?: { [key: string]: Function; };
  actions?: { [key: string]: Function; };
}

export type TypeRegisterRouter = (params: { app: IMalGanisApp, history: History }) => JSX.Element;

export interface IMalGanisApp {
  _router: JSX.Element;
  _store: {
    [key: string]: unknown;
  };
  _fetchingComp: React.ReactNode;
  _cacheRouteModalKey: string[]; // 通过 dynamic 注入的状态实例
  start: {
    (): JSX.Element;
    (container: ReactDOM.Container): void;
  };
  router: (fun: TypeRegisterRouter) => void;
  model: <T>(inst: T) => void;
  unmodule: (namespace: string) => void;
  use: () => void;
}
