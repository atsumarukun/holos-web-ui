import { getVolumes } from "./get-volumes";

const redirectMock = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: (path: string) => redirectMock(path),
}));

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("getVolumes", () => {
  it("success: got volumes", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const mockResponse = {
      volumes: [
        {
          name: "volume",
          isPublic: false,
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
      ],
    };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await getVolumes();

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/volumes`,
      expect.objectContaining({
        method: "GET",
        headers: {
          Authorization: `Session ${token}`,
        },
      })
    );
    expect(result).toEqual({
      success: true,
      data: mockResponse,
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

    await getVolumes();

    expect(redirectMock).toHaveBeenCalledWith("/auth/signin");
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

    const result = await getVolumes();

    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toEqual({
      success: false,
    });
  });

  it("failed: occured fetch error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockRejectedValue(new Error("error"));

    const result = await getVolumes();

    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toEqual({
      success: false,
    });
  });
});
