"use client";

import { useCallback, useEffect, useState } from "react";

import { config } from "@/config";
import { log, oldSchoolCopy } from "../utils";

/**
 * @param timeoutMilliseconds - The number of milliseconds to wait before clearing the copied value. Set to `undefined` to disable.
 *
 * @returns A tuple containing the copied value and a function to copy a value to the clipboard
 *
 * @example
 * const [copied, copyToClipboard] = useCopyToClipboard();
 */
export function useCopyToClipboard(
  timeoutMilliseconds = config.defaults.copyTimeoutMilliseconds,
) {
  const [state, setState] = useState<string>();

  // Effect: Clear timeout when state changes
  useEffect(() => {
    if (!state || !timeoutMilliseconds) return;

    const timeout = setTimeout(() => setState(undefined), timeoutMilliseconds);

    return () => clearTimeout(timeout);
  }, [state, timeoutMilliseconds]);

  const copyToClipboard = useCallback(async (value: string) => {
    try {
      await navigator?.clipboard?.writeText(value);
      setState(value);
    } catch (e) {
      log.error(e);
      oldSchoolCopy(value);
      setState(value);
    }
  }, []);

  return [state, copyToClipboard] as const;
}
