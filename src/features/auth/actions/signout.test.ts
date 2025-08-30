import { signout } from "./signout";

describe("signout", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("success: logged out", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 204,
    });

    const result = await signout(token);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_HOST}/logout`,
      expect.objectContaining({
        method: "DELETE",
        headers: {
          Authorization: `Session ${token}`,
        },
      })
    );
    expect(result).toEqual({
      success: true,
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

    const result = await signout(token);

    expect(result).toEqual({
      success: false,
    });
  });

  it("failed: occured fetch error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    global.fetch = jest.fn().mockRejectedValue(new Error("error"));

    const result = await signout(token);

    expect(result).toEqual({
      success: false,
    });
  });
});
