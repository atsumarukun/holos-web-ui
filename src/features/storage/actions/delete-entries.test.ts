import { errorCode } from "@/lib/errors";
import { deleteEntries } from "./delete-entries";

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("deleteEntries", () => {
  it("success: delete entries", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 204,
    });

    const result = await deleteEntries(volumeName, [
      "key/sample01.txt",
      "key/sample02.txt",
    ]);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/key/sample01.txt`,
      expect.objectContaining({
        method: "DELETE",
        headers: {
          Authorization: `Session ${token}`,
        },
      }),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/key/sample02.txt`,
      expect.objectContaining({
        method: "DELETE",
        headers: {
          Authorization: `Session ${token}`,
        },
      }),
    );
    expect(result).toEqual({
      "key/sample01.txt": { error: undefined },
      "key/sample02.txt": { error: undefined },
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

    const result = await deleteEntries(volumeName, [
      "key/sample01.txt",
      "key/sample02.txt",
    ]);

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

    const result = await deleteEntries(volumeName, [
      "key/sample01.txt",
      "key/sample02.txt",
    ]);

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

    const result = await deleteEntries(volumeName, [
      "key/sample01.txt",
      "key/sample02.txt",
    ]);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      "key/sample01.txt": {
        error: { code: errorCode.Unknown, message: "failed" },
      },
      "key/sample02.txt": {
        error: { code: errorCode.Unknown, message: "failed" },
      },
    });
  });
});
