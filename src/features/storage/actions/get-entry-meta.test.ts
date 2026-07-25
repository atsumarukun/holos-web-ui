import { errorCode } from "@/lib/errors";
import { getEntryMeta } from "./get-entry-meta";

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("getEntryMeta", () => {
  it("success: get entry meta", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";
    const entryKey = "key/sample.txt";
    const mockResponseHeaders = jest.fn((name: string) => {
      switch (name) {
        case "Content-Length":
          return "4";
        case "Holos-Entry-Type":
          return "text/plain; charset=utf-8";
        case "Last-Modified":
          return "2025-01-01T00:00:00Z";
        default:
          return null;
      }
    });

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: {
        get: mockResponseHeaders,
      },
    });

    const result = await getEntryMeta(volumeName, entryKey);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/${entryKey}`,
      expect.objectContaining({
        method: "HEAD",
        headers: {
          Authorization: `Session ${token}`,
        },
      }),
    );
    expect(result).toEqual({
      data: {
        size: 4,
        type: "text/plain; charset=utf-8",
        updatedAt: new Date("2025-01-01T00:00:00Z"),
      },
    });
  });

  it("failed: unauthenticated", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";
    const entryKey = "key/sample.txt";

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });

    const result = await getEntryMeta(volumeName, entryKey);

    expect(result).toEqual({
      error: {
        code: errorCode.Unauthenticated,
        message: "unauthenticated",
      },
    });
  });

  it("failed: internal server error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";
    const entryKey = "key/sample.txt";

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await getEntryMeta(volumeName, entryKey);

    expect(result).toEqual({
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
    });
  });

  it("failed: occured fetch error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";
    const entryKey = "key/sample.txt";

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockRejectedValue(new Error("failed"));

    const result = await getEntryMeta(volumeName, entryKey);

    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toEqual({
      error: {
        code: errorCode.Unknown,
        message: "failed",
      },
    });
  });
});
