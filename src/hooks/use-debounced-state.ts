"use client";

import { config } from "@/config";
import { useEffect, useRef, useState } from "react";

/**
 * A hook that returns a debounced version of the provided state.
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 *
 * @example
 * const debouncedState = useDebouncedState(value, 500);
 */
export function useDebouncedState<T>(
  value: T,
  delay = config.defaults.debounceMilliseconds,
) {
  const [debouncedState, setDebouncedState] = useState(value);
  const handler = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    handler.current = setTimeout(() => {
      setDebouncedState(value);
    }, delay);

    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, [value, delay]);

  return debouncedState;
}
