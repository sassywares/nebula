import { usePathname, useRouter } from "@/i18n/routing";
import { act, renderHook } from "@testing-library/react";
import { useSearchParams } from "../use-search-params";

// Mock the useRouter and usePathname hooks
jest.mock("@/i18n/routing", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock the useNextSearchParams hook
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe("useSearchParams", () => {
  let mockRouter: { push: jest.Mock; replace: jest.Mock };

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
      replace: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue("/current-path");
  });

  it("should set search parameters and navigate", () => {
    const { result } = renderHook(() => useSearchParams());

    act(() => {
      result.current.set({ hello: "world" }, "/sassywares");
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/sassywares?hello=world");
  });

  it("should delete search parameters and replace URL", () => {
    const { result } = renderHook(() => useSearchParams());

    act(() => {
      result.current.delete(["hello"]);
    });

    expect(mockRouter.replace).toHaveBeenCalledWith(
      expect.stringContaining("?"),
    );
  });
});
