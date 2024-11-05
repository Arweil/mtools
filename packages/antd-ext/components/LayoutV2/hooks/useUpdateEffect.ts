import { useEffect, useRef } from 'react';
import useLatest from './useLatest';

export default function useUpdateEffect(fn: () => void, deps: any[]) {
  const didMountRef = useRef(false);
  const effect = useLatest(fn);

  useEffect(() => {
    if (didMountRef.current) {
      return effect();
    } else {
      didMountRef.current = true;
    }
  }, deps);
}
