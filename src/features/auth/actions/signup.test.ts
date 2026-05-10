import { errorCode } from "@/lib/errors";
import { signup } from "./signup";

describe("signup", () => {
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
      }),
    );
    expect(result).toEqual({
      data: mockResponse,
    });
  });

  it("failed: duplicated account", async () => {
    const mockResponse = {
      error: { code: "DUPLICATE", message: "account name already in use" },
    };

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
      error: {
        code: errorCode.Duplicate,
        message: "account name already in use",
      },
    });
  });

  it("failed: internal server error", async () => {
    const mockResponse = {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "internal server error",
      },
    };

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
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
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
      error: {
        code: errorCode.Unknown,
        message: "error",
      },
    });
  });
});
