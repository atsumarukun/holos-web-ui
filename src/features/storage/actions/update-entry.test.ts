import { errorCode } from "@/lib/errors";
import { updateEntry } from "./update-entry";

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("updateEntry", () => {
  it("success: update entry", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";

    const mockResponse = {
      key: "update/sample.txt",
      size: 4,
      type: "text/plain; charset=utf-8",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await updateEntry(volumeName, "key/sample.txt", {
      key: "update/sample.txt",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/key/sample.txt`,
      expect.objectContaining({
        method: "PUT",
        headers: {
          Authorization: `Session ${token}`,
          "Content-Type": "application/json",
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

    const result = await updateEntry(volumeName, "key/sample.txt", {
      key: "update/sample.txt",
    });

    expect(result).toEqual({
      error: {
        code: errorCode.Unauthenticated,
        message: "unauthenticated",
      },
    });
  });

  it("failed: duplicated entry key", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";

    const mockResponse = {
      error: { code: "DUPLICATE", message: "entry key already in use" },
    };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: async () => mockResponse,
    });

    const result = await updateEntry(volumeName, "key/sample.txt", {
      key: "update/sample.txt",
    });

    expect(result).toEqual({
      error: {
        code: errorCode.Duplicate,
        message: "entry key already in use",
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

    const result = await updateEntry(volumeName, "key/sample.txt", {
      key: "update/sample.txt",
    });

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

    const result = await updateEntry(volumeName, "key/sample.txt", {
      key: "update/sample.txt",
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toEqual({
      error: {
        code: errorCode.Unknown,
        message: "failed",
      },
    });
  });
});
