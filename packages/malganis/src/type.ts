import type { BrowserHistoryBuildOptions, History } from 'history';

export interface IMalGanisOpt {
  historyOptions: {
    type: 'browser' | 'hash' | 'memory'
  } & BrowserHistoryBuildOptions;
  useReactContextMode: boolean;
}

export interface IMalGanisModalObj {
  namespace: string;
  state?: { [key: string]: any; };
  computeds?: { [key: string]: Function; };
  actions?: { [key: string]: Function; };
}

export interface IMalGanisApp {
  _router: JSX.Element;
  _store: { [key: string]: unknown };
  _cacheRouteModalKey: string[];
  start: {
    (): JSX.Element;
    (container: ReactDOM.Container): void;
  };
  router: (fun: (params: { app: IMalGanisApp, history: History }) => JSX.Element) => void;
  model: <T>(inst: T) => void;
  unmodule: (namespace: string) => void;
  use: () => void;
}
