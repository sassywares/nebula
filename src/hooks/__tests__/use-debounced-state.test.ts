import { act, renderHook } from "@testing-library/react";
import { useDebouncedState } from "../use-debounced-state";

jest.useFakeTimers();

describe("useDebouncedState", () => {
  it("should return the initial state immediately", () => {
    const { result } = renderHook(() => useDebouncedState("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should update the state after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedState(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      },
    );

    // Update the value
    rerender({ value: "updated", delay: 500 });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("should not update the state before the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedState(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      },
    );

    // Update the value
    rerender({ value: "updated", delay: 500 });

    // Fast-forward time less than the delay
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("initial");
  });
});
