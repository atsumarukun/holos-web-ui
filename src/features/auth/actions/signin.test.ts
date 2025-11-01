import { signin } from "./signin";

const setTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  setToken: (token: string) => setTokenMock(token),
}));

describe("signin", () => {
  it("success: logged in", async () => {
    const mockResponse = { token: "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await signin({
      accountName: "holos",
      password: "password",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_HOST}/login`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    expect(result).toEqual({
      success: true,
    });
    expect(setTokenMock).toHaveBeenCalled();
  });

  it("failed: unauthorized", async () => {
    const mockResponse = { message: "unauthorized" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => mockResponse,
    });

    const result = await signin({
      accountName: "holos",
      password: "password",
    });

    expect(result).toEqual({
      success: false,
      error: "アカウントが存在しないかパスワードが異なります.",
    });
  });

  it("failed: internal server error", async () => {
    const mockResponse = { message: "internal server error" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => mockResponse,
    });

    const result = await signin({
      accountName: "holos",
      password: "password",
    });

    expect(result).toEqual({
      success: false,
    });
  });

  it("failed: occured fetch error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("error"));

    const result = await signin({
      accountName: "holos",
      password: "password",
    });

    expect(result).toEqual({
      success: false,
    });
  });
});
