import { act, renderHook } from "@testing-library/react";
import { useVolumeSelection } from "./select-volume";

describe("useVolumeSelection", () => {
  it("initializes with no selected volumes", () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useVolumeSelection({ volumes: mockVolumes }),
    );

    expect(result.current.selectedVolumes).toEqual([]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("selects a single volume", () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useVolumeSelection({ volumes: mockVolumes }),
    );

    act(() => {
      result.current.onSelect("volume");
    });

    expect(result.current.selectedVolumes).toEqual(["volume"]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("deselects a single volume", () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useVolumeSelection({ volumes: mockVolumes }),
    );

    act(() => {
      result.current.onSelect("volume");
    });
    act(() => {
      result.current.onSelect("volume");
    });

    expect(result.current.selectedVolumes).toEqual([]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("selects all volume", () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useVolumeSelection({ volumes: mockVolumes }),
    );

    act(() => {
      result.current.onSelectAll();
    });

    expect(result.current.selectedVolumes).toEqual(["volume", "test"]);
    expect(result.current.isSelectedAll).toBe(true);
  });

  it("deselects all volume", () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useVolumeSelection({ volumes: mockVolumes }),
    );

    act(() => {
      result.current.onSelectAll();
    });
    act(() => {
      result.current.onSelectAll();
    });

    expect(result.current.selectedVolumes).toEqual([]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("sets isSelectedAll when selected all volumes", () => {
    const mockVolumes = [
      {
        name: "volume",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useVolumeSelection({ volumes: mockVolumes }),
    );

    act(() => {
      result.current.onSelect("volume");
    });
    act(() => {
      result.current.onSelect("test");
    });

    expect(result.current.selectedVolumes).toEqual(["volume", "test"]);
    expect(result.current.isSelectedAll).toBe(true);
  });
});
