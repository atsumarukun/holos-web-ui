import { act, renderHook } from "@testing-library/react";
import { useEntrySelection } from "./select-entry";

describe("useEntrySelection", () => {
  it("initializes with no selected entries", () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useEntrySelection({ entries: mockEntries }),
    );

    expect(result.current.selectedEntryKeys).toEqual([]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("selects a single entry", () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: "test/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useEntrySelection({ entries: mockEntries }),
    );

    act(() => {
      result.current.onSelect("key/sample.txt");
    });

    expect(result.current.selectedEntryKeys).toEqual(["key/sample.txt"]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("deselects a single entry", () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: "test/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useEntrySelection({ entries: mockEntries }),
    );

    act(() => {
      result.current.onSelect("key/sample.txt");
    });
    act(() => {
      result.current.onSelect("key/sample.txt");
    });

    expect(result.current.selectedEntryKeys).toEqual([]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("selects all entry", () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: "test/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useEntrySelection({ entries: mockEntries }),
    );

    act(() => {
      result.current.onSelectAll();
    });

    expect(result.current.selectedEntryKeys).toEqual([
      "key/sample.txt",
      "test/sample.txt",
    ]);
    expect(result.current.isSelectedAll).toBe(true);
  });

  it("deselects all entry when called onSelectAll", () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: "test/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useEntrySelection({ entries: mockEntries }),
    );

    act(() => {
      result.current.onSelectAll();
    });
    act(() => {
      result.current.onSelectAll();
    });

    expect(result.current.selectedEntryKeys).toEqual([]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("deselects all entry when called onClear", () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: "test/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useEntrySelection({ entries: mockEntries }),
    );

    act(() => {
      result.current.onSelectAll();
    });
    act(() => {
      result.current.onClear();
    });

    expect(result.current.selectedEntryKeys).toEqual([]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("sets isSelectedAll when selected all entries", () => {
    const mockEntries = [
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: "test/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { result } = renderHook(() =>
      useEntrySelection({ entries: mockEntries }),
    );

    act(() => {
      result.current.onSelect("key/sample.txt");
    });
    act(() => {
      result.current.onSelect("test/sample.txt");
    });

    expect(result.current.selectedEntryKeys).toEqual([
      "key/sample.txt",
      "test/sample.txt",
    ]);
    expect(result.current.isSelectedAll).toBe(true);
  });
});
