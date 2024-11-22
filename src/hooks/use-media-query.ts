"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(breakpoint: number): boolean {
  const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);

  const [matches, setMatches] = useState(mediaQuery.matches);

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener
    mediaQuery.addEventListener("change", onChange);

    // Clean up
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [breakpoint, mediaQuery]);

  return matches;
}
