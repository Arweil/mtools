import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './public-path';

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: boolean | undefined;
    $$_e: number | undefined;
  }
}

type OnGlobalStateChangeCallback = (
  state: Record<string, any>,
  prevState: Record<string, any>,
) => void;

interface IQiankunProps {
  container: HTMLElement;
  name: string;
  onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void;
  setGlobalState: (state: Record<string, any>) => boolean;
  mountParcel: () => void;
  singleSpa: any;
}

if (!window.__POWERED_BY_QIANKUN__) {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<App />);
}

export function bootstrap() {}

export function mount(props: IQiankunProps): void {
  props.onGlobalStateChange(
    (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
    true,
  );

  const root = ReactDOM.createRoot(
    props.container ? props.container.querySelector('#root')! : document.getElementById('root')!,
  );

  root.render(<App />);
}

export function unmount(props: IQiankunProps): void {
  const { container } = props;

  const root = ReactDOM.createRoot(
    props.container ? container.querySelector('#root')! : document.getElementById('root')!,
  );

  root.unmount();
}
