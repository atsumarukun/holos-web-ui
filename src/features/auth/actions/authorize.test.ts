import { authorize } from "./authorize";

describe("authorize", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("success: authorized", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    const mockResponse = {
      id: "e3e36f5d-0ec0-4ac4-a6b5-97f49212a376",
      name: "holos",
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await authorize(token);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_HOST}/authorization`,
      expect.objectContaining({
        method: "GET",
        headers: {
          Authorization: `Session ${token}`,
        },
      })
    );
    expect(result).toEqual({
      success: true,
      data: { name: mockResponse.name },
    });
  });

  it("failed: unauthorized", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    const mockResponse = { message: "unauthorized" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => mockResponse,
    });

    const result = await authorize(token);

    expect(result).toEqual({
      success: false,
      error: "認証に失敗しました.",
    });
  });

  it("failed: internal server error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    const mockResponse = { message: "internal server error" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => mockResponse,
    });

    const result = await authorize(token);

    expect(result).toEqual({
      success: false,
    });
  });

  it("failed: occured fetch error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    global.fetch = jest.fn().mockRejectedValue(new Error("error"));

    const result = await authorize(token);

    expect(result).toEqual({
      success: false,
    });
  });
});
