import { renderHook, waitFor } from "@testing-library/react";
import { useEntryDestinationList } from "./entry-destination-list";
import { errorCode } from "@/lib/errors";

const getEntriesMock = jest.fn();
jest.mock("@/features/storage/actions/get-entries", () => ({
  getEntries: () => getEntriesMock(),
}));

describe("useEntryDestinationList", () => {
  it("updates state correctly after initial fetch", async () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    ];

    getEntriesMock.mockResolvedValue({
      data: {
        entries: mockEntries,
      },
    });

    const { result } = renderHook(() =>
      useEntryDestinationList({
        volumeName: "volume",
        dstKey: "dst/sample.txt",
      }),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.entries).toEqual([]);
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.entries).toEqual(mockEntries);
      expect(result.current.error).toBeUndefined();
    });
  });

  it("failed to get entries", async () => {
    getEntriesMock.mockResolvedValue({
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
    });

    const { result } = renderHook(() =>
      useEntryDestinationList({
        volumeName: "volume",
        dstKey: "dst/sample.txt",
      }),
    );

    await waitFor(() => {
      expect(result.current.entries).toEqual([]);
      expect(result.current.error).toEqual({
        code: errorCode.InternalServerError,
        message: "internal server error",
      });
    });
  });
});
