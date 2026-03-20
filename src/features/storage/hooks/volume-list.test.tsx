import { act, renderHook, waitFor } from "@testing-library/react";
import { useVolumeList } from "./volume-list";

const useSearchParamsMock = jest.fn();
jest.mock("next/navigation", () => ({
  useSearchParams: () => useSearchParamsMock(),
}));

const getVolumesMock = jest.fn();
jest.mock("@/features/storage/actions/get-volumes", () => ({
  getVolumes: () => getVolumesMock(),
}));

const onCompletedMock = jest.fn();
const onErrorMock = jest.fn();

describe("useVolumeList", () => {
  it("updates state correctly after initial fetch", async () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    ];

    useSearchParamsMock.mockReturnValue(new URLSearchParams({}));
    getVolumesMock.mockResolvedValue({
      data: {
        volumes: mockVolumes,
      },
    });

    const { result } = renderHook(() => useVolumeList());

    expect(result.current.loading).toBe(true);
    expect(result.current.volumes).toEqual([]);
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.volumes).toEqual(mockVolumes);
      expect(result.current.error).toBeUndefined();
    });
  });

  it("filters volumes by search params", async () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
      {
        name: "test",
        isPublic: false,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    ];

    useSearchParamsMock.mockReturnValue(new URLSearchParams({ search: "vol" }));
    getVolumesMock.mockResolvedValue({
      data: {
        volumes: mockVolumes,
      },
    });

    const { result } = renderHook(() => useVolumeList());

    await waitFor(() => {
      expect(result.current.volumes).toEqual([
        {
          name: "volume",
          isPublic: false,
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
      ]);
    });
  });

  it("failed to get volumes", async () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams({ search: "vol" }));
    getVolumesMock.mockResolvedValue({
      error: new Error("failed"),
    });

    const { result } = renderHook(() => useVolumeList());

    await waitFor(() => {
      expect(result.current.volumes).toEqual([]);
      expect(result.current.error).toEqual(new Error("failed"));
    });
  });

  it("calls getVolumes when refetch is called", async () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    ];

    useSearchParamsMock.mockReturnValue(new URLSearchParams({}));
    getVolumesMock.mockResolvedValue({
      data: {
        volumes: mockVolumes,
      },
    });

    const { result } = renderHook(() => useVolumeList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refetch();
    });

    expect(getVolumesMock).toHaveBeenCalledTimes(2);
  });

  it("calls onCompleted when fetch succeeds", async () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    ];

    useSearchParamsMock.mockReturnValue(new URLSearchParams({}));
    getVolumesMock.mockResolvedValue({
      data: {
        volumes: mockVolumes,
      },
    });

    const { result } = renderHook(() => useVolumeList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refetch({
        onCompleted: onCompletedMock,
      });
    });

    expect(onCompletedMock).toHaveBeenCalledTimes(1);
    expect(onCompletedMock).toHaveBeenCalledWith(mockVolumes);
  });

  it("calls onError when fetch fails", async () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams({}));
    getVolumesMock.mockResolvedValue({
      error: new Error("failed"),
    });

    const { result } = renderHook(() => useVolumeList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refetch({
        onError: onErrorMock,
      });
    });

    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock).toHaveBeenCalledWith(new Error("failed"));
  });
});
