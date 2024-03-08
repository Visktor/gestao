import { useEffect, useState } from "react";

export default function useDebounce<T extends string>({
  depValue,
  callback,
  timeout,
  error,
}: {
  depValue: T;
  /** Used to determine whether the callback function should
   * be called.*/
  callback?: (debouncedValue: string, abortSignal: AbortSignal) => any;
  error?: boolean;
  timeout?: number;
}): string | number {
  const [debounced, setDebounced] = useState<T>(() => depValue);

  useEffect(() => {
    const timeOutRef = setTimeout(() => {
      setDebounced(depValue);
    }, timeout ?? 500);

    return () => clearTimeout(timeOutRef);
  }, [depValue]);

  useEffect(() => {
    const abortController = new AbortController();
    if (!error && callback) {
      callback(debounced, abortController.signal);
    }

    return () => abortController.abort();
  }, [debounced]);

  return debounced;
}
