import { signout } from "./signout";

const getTokenMock = jest.fn();
const removeTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
  removeToken: () => removeTokenMock(),
}));

describe("signout", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("success: logged out", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 204,
    });

    const result = await signout();

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
    expect(removeTokenMock).toHaveBeenCalled();
  });

  it("failed: internal server error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const mockResponse = { message: "internal server error" };

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => mockResponse,
    });

    const result = await signout();

    expect(result).toEqual({
      success: false,
    });
  });

  it("failed: occured fetch error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";

    getTokenMock.mockResolvedValue(token);
    global.fetch = jest.fn().mockRejectedValue(new Error("error"));

    const result = await signout();

    expect(result).toEqual({
      success: false,
    });
  });
});
