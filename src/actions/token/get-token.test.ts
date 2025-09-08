import { cookies } from "next/headers";
import { getToken } from ".";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("getToken", () => {
  it("success: got token", async () => {
    const getMock = jest.fn().mockReturnValue({ value: "test-token" });
    (cookies as jest.Mock).mockResolvedValue({
      get: getMock,
    });

    const result = await getToken();

    expect(result).toBe("test-token");
    expect(getMock).toHaveBeenCalledWith("token");
  });

  it("failed: undefined", async () => {
    const getMock = jest.fn();
    (cookies as jest.Mock).mockResolvedValue({
      get: getMock,
    });

    const result = await getToken();

    expect(result).toBeUndefined();
    expect(getMock).toHaveBeenCalledWith("token");
  });
});
