import { Breakpoint } from "@/types";
import { act, renderHook } from "@testing-library/react";
import { useMediaQuery } from "../use-media-query";

// Mock the Breakpoint enum
jest.mock("../../types", () => ({
  Breakpoint: {
    sm: 600,
    md: 900,
    lg: 1200,
  },
}));

// Mock window.matchMedia
const matchMediaMock = jest.fn();
window.matchMedia = matchMediaMock;

describe("useMediaQuery", () => {
  beforeEach(() => {
    matchMediaMock.mockClear();
  });

  it("should return the initial value based on the media query", () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    const { result } = renderHook(() => useMediaQuery(Breakpoint.md));
    expect(result.current).toBe(true);
  });

  it("should update the value when the media query changes", () => {
    let listener: (e: MediaQueryListEvent) => void;
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: (
        event: string,
        callback: (e: MediaQueryListEvent) => void,
      ) => {
        if (event === "change") {
          listener = callback;
        }
      },
      removeEventListener: jest.fn(),
    });

    const { result } = renderHook(() => useMediaQuery(Breakpoint.md));

    expect(result.current).toBe(false);

    // Simulate a media query change
    act(() => {
      listener({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });
});
