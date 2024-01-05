import { useCallback, useEffect, useRef } from 'react';

type Fn = (...args: any[]) => any;

interface EventCallbackHook {
  <T extends Fn>(fn: T): (...args: Parameters<T>) => ReturnType<T>;
}

const useEventCallback: EventCallbackHook = <T extends Fn>(fn: T) => {
  const callbackRef = useRef(fn);

  useEffect(() => {
    callbackRef.current = fn;
  }, [fn]);

  return useCallback(
    (...args: Parameters<T>) => callbackRef.current(...args),
    []
  );
};

export default useEventCallback;
