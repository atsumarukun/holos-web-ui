import { renderHook, waitFor } from "@testing-library/react";
import { useToken } from "./token";

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("useToken", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("initialize", () => {
    getTokenMock.mockResolvedValue("1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS");

    const { result } = renderHook(() => useToken());
    expect(result.current).toBeUndefined();
  });

  it("get token after resolved", async () => {
    getTokenMock.mockResolvedValue("1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS");

    const { result } = renderHook(() => useToken());

    await waitFor(() => {
      expect(result.current).toBe("1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS");
    });
  });

  it("get token after resolved by undefined", async () => {
    getTokenMock.mockResolvedValue(undefined);

    const { result } = renderHook(() => useToken());

    await waitFor(() => {
      expect(result.current).toBeUndefined();
    });
  });
});
