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
      success: true,
      data: {
        volumes: mockVolumes,
      },
    });

    const { result } = renderHook(() => useVolumeList());

    expect(result.current.loading).toBe(true);
    expect(result.current.success).toBe(false);
    expect(result.current.volumes).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);
      expect(result.current.volumes).toEqual(mockVolumes);
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
      success: true,
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
      success: false,
      data: undefined,
    });

    const { result } = renderHook(() => useVolumeList());

    await waitFor(() => {
      expect(result.current.success).toBe(false);
      expect(result.current.volumes).toEqual([]);
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
      success: true,
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
});
