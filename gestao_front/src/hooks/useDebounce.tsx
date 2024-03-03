import { useEffect, useState } from "react";

export default function useDebounce({
  depValue,
  callback,
  timeout,
  error,
}: {
  depValue: string | number;
  /** Used to determine whether the callback function should
   * be called.*/
  callback?: (debouncedValue: string | number, abortSignal: AbortSignal) => any;
  error?: boolean;
  timeout?: number;
}): string | number {
  const [debounced, setDebounced] = useState<string | number>("");

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
