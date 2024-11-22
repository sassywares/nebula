import { act, renderHook } from "@testing-library/react";
import { useDebouncedCallback } from "../use-debounced-callback";

jest.useFakeTimers();

describe("useDebouncedCallback", () => {
  it("should debounce the callback function", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    // Call the debounced function multiple times
    act(() => {
      result.current();
      result.current();
      result.current();
    });

    // Fast-forward time
    jest.advanceTimersByTime(500);

    // Ensure the callback is called only once
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should cancel the timeout on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, 500),
    );

    // Call the debounced function
    act(() => {
      result.current();
    });

    // Unmount the component
    unmount();

    // Fast-forward time
    jest.advanceTimersByTime(500);

    // Ensure the callback is not called after unmount
    expect(callback).not.toHaveBeenCalled();
  });
});
