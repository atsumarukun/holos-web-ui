import { createVolume } from "./create-volume";

const redirectMock = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: (path: string) => redirectMock(path),
}));

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("createVolume", () => {
  it("success: create volume", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    const mockResponse = {
      name: "volume",
      isPublic: false,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => mockResponse,
    });

    const result = await createVolume({
      name: "volume",
      isPublic: true,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/volumes`,
      expect.objectContaining({
        method: "POST",
        headers: {
          Authorization: `Session ${token}`,
          "Content-Type": "application/json",
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

    await createVolume({
      name: "volume",
      isPublic: true,
    });

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

    const result = await createVolume({
      name: "volume",
      isPublic: true,
    });

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

    const result = await createVolume({
      name: "volume",
      isPublic: true,
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toEqual({
      success: false,
    });
  });
});
