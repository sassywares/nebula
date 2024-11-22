import { renderHook } from "@testing-library/react";
import { useIsFirstRender } from "../use-is-first-render";

describe("useIsFirstRender", () => {
  it("should return true on the first render and false on subsequent renders", () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());

    // On the first render, it should return true
    expect(result.current).toBe(true);

    // On subsequent renders, it should return false
    rerender();
    expect(result.current).toBe(false);

    rerender();
    expect(result.current).toBe(false);
  });
});
