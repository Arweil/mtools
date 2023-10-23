import type { BrowserHistoryBuildOptions, History } from 'history';

export type { History } from 'history';

export interface IMalGanisOpt {
  historyOptions: {
    type: 'browser' | 'hash' | 'memory';
  } & BrowserHistoryBuildOptions;
  clearPageStore: boolean;
  fetchingComp: React.ReactNode;
}

export interface IMalGanisModalObj {
  namespace: string;
  state?: Record<string, any>;
  computeds?: Record<string, Function>;
  actions?: Record<string, Function>;
}

export type TypeRegisterRouter = (params: { app: IMalGanisApp; history: History }) => JSX.Element;

export interface IMalGanisApp {
  _router: JSX.Element;
  _store: Record<string, unknown>;
  _fetchingComp: React.ReactNode;
  _cacheRouteModalKey: string[]; // 通过 dynamic 注入的状态实例
  _clearPageStore: boolean;
  start: {
    (): JSX.Element;
    (container: ReactDOM.Container): void;
  };
  router: (fun: TypeRegisterRouter) => void;
  model: <T>(inst: T) => void;
  unmodule: (namespace: string) => void;
  use: () => void;
}
