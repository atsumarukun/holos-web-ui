import { errorCode } from "@/lib/errors";
import { updateEntries } from "./update-entries";

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("updateEntries", () => {
  it("success: update entries", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";

    const mockResponses = [
      {
        key: "key/update01.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
      {
        key: "key/update02.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    ];

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponses[0],
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponses[1],
      });

    const result = await updateEntries(volumeName, {
      "key/sample01.txt": {
        key: "key/update01.txt",
      },
      "key/sample02.txt": {
        key: "key/update02.txt",
      },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/key/sample01.txt`,
      expect.objectContaining({
        method: "PUT",
        headers: {
          Authorization: `Session ${token}`,
          "Content-Type": "application/json",
        },
      }),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/key/sample02.txt`,
      expect.objectContaining({
        method: "PUT",
        headers: {
          Authorization: `Session ${token}`,
          "Content-Type": "application/json",
        },
      }),
    );
    expect(result).toEqual({
      "key/sample01.txt": { data: mockResponses[0] },
      "key/sample02.txt": { data: mockResponses[1] },
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

    const result = await updateEntries(volumeName, {
      "key/sample01.txt": {
        key: "key/update01.txt",
      },
      "key/sample02.txt": {
        key: "key/update02.txt",
      },
    });

    expect(result).toEqual({
      "key/sample01.txt": {
        error: {
          code: errorCode.Unauthenticated,
          message: "unauthenticated",
        },
      },
      "key/sample02.txt": {
        error: {
          code: errorCode.Unauthenticated,
          message: "unauthenticated",
        },
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

    const result = await updateEntries(volumeName, {
      "key/sample01.txt": {
        key: "key/update01.txt",
      },
      "key/sample02.txt": {
        key: "key/update02.txt",
      },
    });

    expect(result).toEqual({
      "key/sample01.txt": {
        error: {
          code: errorCode.Duplicate,
          message: "entry key already in use",
        },
      },
      "key/sample02.txt": {
        error: {
          code: errorCode.Duplicate,
          message: "entry key already in use",
        },
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

    const result = await updateEntries(volumeName, {
      "key/sample01.txt": {
        key: "key/update01.txt",
      },
      "key/sample02.txt": {
        key: "key/update02.txt",
      },
    });

    expect(result).toEqual({
      "key/sample01.txt": {
        error: {
          code: errorCode.InternalServerError,
          message: "internal server error",
        },
      },
      "key/sample02.txt": {
        error: {
          code: errorCode.InternalServerError,
          message: "internal server error",
        },
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

    const result = await updateEntries(volumeName, {
      "key/sample01.txt": {
        key: "key/update01.txt",
      },
      "key/sample02.txt": {
        key: "key/update02.txt",
      },
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toEqual({
      "key/sample01.txt": {
        error: {
          code: errorCode.Unknown,
          message: "failed",
        },
      },
      "key/sample02.txt": {
        error: {
          code: errorCode.Unknown,
          message: "failed",
        },
      },
    });
  });
});
