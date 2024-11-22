import { act, renderHook } from "@testing-library/react";
import { useCopyToClipboard } from "../use-copy-to-clipboard";

describe("useCopyToClipboard", () => {
  it("should copy text to clipboard and update state", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    // Initially, the copied state should be undefined
    expect(result.current[0]).toBeUndefined();

    // Mock the clipboard API
    const writeTextMock = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    // Use the copyToClipboard function
    await act(async () => {
      await result.current[1]("Hello, World!");
    });

    // Check if the clipboard API was called with the correct text
    expect(writeTextMock).toHaveBeenCalledWith("Hello, World!");

    // Check if the state was updated with the copied text
    expect(result.current[0]).toBe("Hello, World!");
  });
});
