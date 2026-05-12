import { useCallback, useRef } from 'react';

export default function useLatest<
  T extends (...args: any[]) => any,
  U extends any[] = Parameters<T>,
  V = ReturnType<T>,
>(value: (...args: U) => V): (...args: U) => V;
export default function useLatest<
  T extends (...args: any[]) => any,
  U extends any[] = Parameters<T>,
  V = ReturnType<T>,
>(value: ((...args: U) => V) | undefined): (...args: U) => V | undefined;
export default function useLatest<
  T extends (...args: any[]) => any,
  U extends any[] = Parameters<T>,
  V = ReturnType<T>,
>(value?: (...args: U) => V): (...args: U) => V | undefined {
  const ref = useRef(value);
  ref.current = value;

  const memoFn = useCallback((...args: U) => ref.current?.(...args), []);

  return memoFn;
}
