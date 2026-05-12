import { errorCode } from "@/lib/errors";
import { copyEntry } from "./copy-entry";

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("copyEntry", () => {
  it("success: copy entry", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";

    const mockResponse = {
      key: "key/sample copy.txt",
      size: 4,
      type: "text/plain; charset=utf-8",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => mockResponse,
    });

    const result = await copyEntry(volumeName, "key/sample.txt");

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/key/sample.txt`,
      expect.objectContaining({
        method: "POST",
        headers: {
          Authorization: `Session ${token}`,
        },
      }),
    );
    expect(result).toEqual({
      data: mockResponse,
    });
  });

  it("failed: unauthenticated", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";

    const mockResponse = {
      error: { code: "UNAUTHENTICATED", message: "unauthenticated" },
    };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => mockResponse,
    });

    const result = await copyEntry(volumeName, "key/sample.txt");

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

    const mockResponse = {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "internal server error",
      },
    };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => mockResponse,
    });

    const result = await copyEntry(volumeName, "key/sample.txt");

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

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockRejectedValue(new Error("failed"));

    const result = await copyEntry(volumeName, "key/sample.txt");

    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toEqual({
      error: {
        code: errorCode.Unknown,
        message: "failed",
      },
    });
  });
});
