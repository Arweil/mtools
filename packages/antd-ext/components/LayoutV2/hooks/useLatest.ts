import { useCallback, useRef } from 'react';

export default function useLatest<T extends (...args: any[]) => any>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  const memoFn = useCallback(
    (...args: Parameters<T>) => ref.current?.(...args) as ReturnType<T>,
    [],
  );

  return memoFn;
}
