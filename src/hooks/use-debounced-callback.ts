"use client";

import { config } from "@/config";
import { useCallback, useEffect, useRef } from "react";

type CallbackFunction = (...args: any[]) => void;

/**
 * A hook that returns a debounced version of the provided callback.
 * @param fn The callback to debounce
 * @param delay The delay in milliseconds
 *
 * @example
 * const debouncedCallback = useDebouncedCallback(callback, 500);
 */
export function useDebouncedCallback(
  fn: CallbackFunction,
  delay = config.defaults.debounceIntervalMs,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const debouncedFn = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn;
}
