import { useEffect, useMemo, useRef } from 'react';

type Fn = (...args: any[]) => any;

export function debounce<T extends Fn>(func: T, delay: number) {
  let lastArgs;
  let lastThis;
  let result;
  let timerId;
  let lastCallTime;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  delay = +delay || 0;

  function invokeFunc() {
    const args = lastArgs;

    lastArgs = lastThis = undefined;
    result = func.apply(lastThis, args);
    return result;
  }

  function startTimer(pendingFunc, milliseconds) {
    return setTimeout(pendingFunc, milliseconds);
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeWaiting = delay - timeSinceLastCall;

    return timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;

    return lastCallTime === undefined || timeSinceLastCall >= delay || timeSinceLastCall < 0;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge();
    }
    timerId = startTimer(timerExpired, remainingWait(time));
    return undefined;
  }

  function trailingEdge() {
    timerId = undefined;

    if (lastArgs) {
      return invokeFunc();
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function debounced(...args) {
    const time = Date.now();

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-invalid-this
    lastThis = this;
    lastCallTime = time;

    if (timerId === undefined) {
      timerId = startTimer(timerExpired, delay);
    }
    return result;
  }

  debounced.cancel = function () {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  };

  return debounced;
}

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
