import { cookies } from "next/headers";
import { removeToken } from ".";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("removeToken", () => {
  it("success: removed token", async () => {
    const deleteMock = jest.fn();
    (cookies as jest.Mock).mockResolvedValue({
      delete: deleteMock,
    });

    await removeToken();

    expect(deleteMock).toHaveBeenCalledWith("token");
  });
});
