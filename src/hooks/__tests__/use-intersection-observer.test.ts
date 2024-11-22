import { act, renderHook } from "@testing-library/react";
import { useIntersectionObserver } from "../use-intersection-observer";

describe("useIntersectionObserver", () => {
  it("should create an IntersectionObserver and update entry state", () => {
    const mockObserve = jest.fn();
    const mockDisconnect = jest.fn();

    // Mock the IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
    }));

    const { result } = renderHook(() => useIntersectionObserver());

    // Initially, the entry should be undefined
    expect(result.current[1]).toBeUndefined();

    // Simulate observing an element
    const element = document.createElement("div");
    act(() => {
      (
        result.current as [
          typeof mockObserve,
          IntersectionObserverEntry | undefined,
        ]
      )[0](element);
    });

    // Check if the observer was set up correctly
    expect(mockObserve).toHaveBeenCalledWith(element);

    // Simulate an intersection change
    const mockEntry = { isIntersecting: true } as IntersectionObserverEntry;
    act(() => {
      (global.IntersectionObserver as jest.Mock).mock.calls[0][0]([mockEntry]);
    });

    // Check if the entry state was updated
    expect(result.current[1]).toEqual(mockEntry);

    // Clean up
    act(() => {
      (
        result.current as [
          typeof mockObserve,
          IntersectionObserverEntry | undefined,
        ]
      )[0](null);
    });
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
