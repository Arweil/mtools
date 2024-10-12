import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef } from 'react';

type Fn = (...args: any[]) => any;

export { debounce };

export default function useDebounceFn<T extends Fn>(func: T, delay: number) {
  const funcRef = useRef(func);
  funcRef.current = func;
  // 通过ref方式调用获取最新回调函数，避免渲染时debounced函数被重新执行
  const debounced = useMemo(() => debounce((...args) => funcRef.current(...args), delay), [delay]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
}
