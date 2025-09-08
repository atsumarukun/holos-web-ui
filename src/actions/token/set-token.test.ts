import { cookies } from "next/headers";
import { setToken } from ".";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("setToken", () => {
  it("success: set token", async () => {
    const setMock = jest.fn();
    (cookies as jest.Mock).mockResolvedValue({ set: setMock });

    await setToken("test-token");

    expect(setMock).toHaveBeenCalledWith("token", "test-token", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  });
});
