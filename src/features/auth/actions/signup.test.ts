import { signup } from "./signup";

describe("signup", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("success: created account", async () => {
    const mockResponse = { name: "holos" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => mockResponse,
    });

    const result = await signup({
      name: "holos",
      password: "password",
      confirmPassword: "password",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_HOST}/accounts`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    expect(result).toEqual({
      success: true,
      data: mockResponse,
    });
  });

  it("failed: duplicated account", async () => {
    const mockResponse = { message: "conflict" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: async () => mockResponse,
    });

    const result = await signup({
      name: "holos",
      password: "password",
      confirmPassword: "password",
    });

    expect(result).toEqual({
      success: false,
      error: "アカウント名がすでに利用されています.",
    });
  });

  it("failed: internal server error", async () => {
    const mockResponse = { message: "internal server error" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => mockResponse,
    });

    const result = await signup({
      name: "holos",
      password: "password",
      confirmPassword: "password",
    });

    expect(result).toEqual({
      success: false,
    });
  });

  it("failed: occured fetch error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("error"));

    const result = await signup({
      name: "holos",
      password: "password",
      confirmPassword: "password",
    });

    expect(result).toEqual({
      success: false,
    });
  });
});
