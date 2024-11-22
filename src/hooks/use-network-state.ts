import { useRef, useSyncExternalStore } from "react";

import { isShallowEqual } from "../utils";

const getConnection = () => {
  return (
    (navigator as any)?.connection ||
    (navigator as any)?.mozConnection ||
    (navigator as any)?.webkitConnection
  );
};

const useNetworkStateSubscribe = (callback: () => void) => {
  window.addEventListener("online", callback, { passive: true });
  window.addEventListener("offline", callback, { passive: true });

  const connection = getConnection();

  if (connection) {
    connection.addEventListener("change", callback, { passive: true });
  }

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);

    if (connection) {
      connection.removeEventListener("change", callback);
    }
  };
};

const getNetworkStateServerSnapshot = () => {
  throw Error("useNetworkState is a client-only hook");
};

/**
 * Courtesy of {@link https://usehooks.com/usenetworkstate}
 *
 * @returns An object containing the current network state
 *
 * @example
 * const { online, downlink, downlinkMax, effectiveType, rtt, saveData, type } = useNetworkState();
 */
export function useNetworkState() {
  const cache = useRef({});

  const getSnapshot = () => {
    const online = navigator.onLine;
    const connection = getConnection();

    const nextState = {
      online,
      rtt: connection?.rtt,
      type: connection?.type,
      downlink: connection?.downlink,
      saveData: connection?.saveData,
      downlinkMax: connection?.downlinkMax,
      effectiveType: connection?.effectiveType,
    };

    if (isShallowEqual(cache.current, nextState)) {
      return cache.current;
    } else {
      cache.current = nextState;
      return nextState;
    }
  };

  return useSyncExternalStore(
    useNetworkStateSubscribe,
    getSnapshot,
    getNetworkStateServerSnapshot,
  );
}
