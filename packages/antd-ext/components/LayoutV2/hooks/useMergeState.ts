import { useState } from 'react';
import useLatest from './useLatest';

interface Options<T> {
  defaultValue?: T;
  value?: T;
}

type Updater<T> = (updater: T | ((prevState: T) => T)) => void;

export default function useMergeState<T>(
  defaultState: T | (() => T),
  options?: Options<T>,
): [T, Updater<T>] {
  const { defaultValue, value } = options || {};
  const [state, setState] = useState<T>(() => {
    if (value !== undefined) {
      return value;
    } else if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
    } else {
      return typeof defaultState === 'function' ? (defaultState as () => T)() : defaultState;
    }
  });

  const mergeState = value !== undefined ? value : state;

  const stateChange: Updater<T> = useLatest(updater => {
    setState(updater);
  });

  return [mergeState, stateChange];
}
