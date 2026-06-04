import { act, renderHook, waitFor } from "@testing-library/react";
import { useEntryList } from "./entry-list";
import { errorCode } from "@/lib/errors";

const useSearchParamsMock = jest.fn();
jest.mock("next/navigation", () => ({
  useSearchParams: () => useSearchParamsMock(),
}));

const getEntriesMock = jest.fn();
jest.mock("@/features/storage/actions/get-entries", () => ({
  getEntries: () => getEntriesMock(),
}));

const onCompletedMock = jest.fn();
const onErrorMock = jest.fn();

describe("useEntryList", () => {
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

    useSearchParamsMock.mockReturnValue(new URLSearchParams({}));
    getEntriesMock.mockResolvedValue({
      data: {
        entries: mockEntries,
      },
    });

    const { result } = renderHook(() =>
      useEntryList({
        volumeName: "volume",
        currentKey: "key/sample.txt",
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

  it("filters entries by search params", async () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
      {
        key: "test/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    ];

    useSearchParamsMock.mockReturnValue(new URLSearchParams({ search: "key" }));
    getEntriesMock.mockResolvedValue({
      data: {
        entries: mockEntries,
      },
    });

    const { result } = renderHook(() =>
      useEntryList({
        volumeName: "volume",
        currentKey: "key/sample.txt",
      }),
    );

    await waitFor(() => {
      expect(result.current.entries).toEqual([
        {
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
      ]);
    });
  });

  it("failed to get entries", async () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams({ search: "key" }));
    getEntriesMock.mockResolvedValue({
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
    });

    const { result } = renderHook(() =>
      useEntryList({
        volumeName: "volume",
        currentKey: "key/sample.txt",
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

  it("calls getEntries when refetch is called", async () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    ];

    useSearchParamsMock.mockReturnValue(new URLSearchParams({}));
    getEntriesMock.mockResolvedValue({
      data: {
        entries: mockEntries,
      },
    });

    const { result } = renderHook(() =>
      useEntryList({
        volumeName: "volume",
        currentKey: "key/sample.txt",
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refetch();
    });

    expect(getEntriesMock).toHaveBeenCalledTimes(2);
  });

  it("calls onCompleted when fetch succeeds", async () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    ];

    useSearchParamsMock.mockReturnValue(new URLSearchParams({}));
    getEntriesMock.mockResolvedValue({
      data: {
        entries: mockEntries,
      },
    });

    const { result } = renderHook(() =>
      useEntryList({
        volumeName: "volume",
        currentKey: "key/sample.txt",
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refetch({
        onCompleted: onCompletedMock,
      });
    });

    expect(onCompletedMock).toHaveBeenCalledTimes(1);
    expect(onCompletedMock).toHaveBeenCalledWith(mockEntries);
  });

  it("calls onError when fetch fails", async () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams({}));
    getEntriesMock.mockResolvedValue({
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
    });

    const { result } = renderHook(() =>
      useEntryList({
        volumeName: "volume",
        currentKey: "key/sample.txt",
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refetch({
        onError: onErrorMock,
      });
    });

    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock).toHaveBeenCalledWith({
      code: errorCode.InternalServerError,
      message: "internal server error",
    });
  });
});
