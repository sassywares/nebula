import { useRef } from "react";

/**
 * Coutesy of {@link https://usehooks.com/useisfirstrender}
 *
 * @returns A boolean indicating whether the current render is the first render
 *
 * @example
 * const isFirstRender = useIsFirstRender();
 */
export function useIsFirstRender() {
  const renderRef = useRef(true);

  if (renderRef.current === true) {
    renderRef.current = false;
    return true;
  }

  return renderRef.current;
}
