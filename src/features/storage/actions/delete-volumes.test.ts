import { deleteVolumes } from "./delete-volumes";

const redirectMock = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: (path: string) => redirectMock(path),
}));

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("deleteVolumes", () => {
  it("success: delete volumes", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 204,
    });

    const result = await deleteVolumes(["vol1", "vol2"]);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/volumes/vol1`,
      expect.objectContaining({
        method: "DELETE",
        headers: {
          Authorization: `Session ${token}`,
        },
      })
    );
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/volumes/vol2`,
      expect.objectContaining({
        method: "DELETE",
        headers: {
          Authorization: `Session ${token}`,
        },
      })
    );
    expect(result).toEqual({
      vol1: { success: true },
      vol2: { success: true },
    });
  });

  it("failed: unauthorized", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const mockResponse = { message: "unauthorized" };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => mockResponse,
    });

    await deleteVolumes(["vol1", "vol2"]);

    expect(redirectMock).toHaveBeenCalledWith("/auth/signin");
  });

  it("failed: volume is not empty", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const mockResponse = { message: "conflict" };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 204,
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: async () => mockResponse,
      });

    const result = await deleteVolumes(["vol1", "vol2"]);

    expect(result).toEqual({
      vol1: { success: true },
      vol2: { success: false, error: "空ではないボリュームは削除できません." },
    });
  });

  it("failed: internal server error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const mockResponse = { message: "internal server error" };

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => mockResponse,
    });

    const result = await deleteVolumes(["vol1", "vol2"]);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      vol1: { success: false },
      vol2: { success: false },
    });
  });

  it("failed: occured fetch error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockRejectedValue(new Error("error"));

    const result = await deleteVolumes(["vol1", "vol2"]);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      vol1: { success: false },
      vol2: { success: false },
    });
  });
});
