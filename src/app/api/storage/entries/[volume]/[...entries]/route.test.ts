import { GET } from "./route";

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("GET /api/storage/entries/[volume]/[...entries]", () => {
  it("success: get entry", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";
    const entryKey = "key/sample.txt";
    const mockRequest = new Request(
      `http://localhost/api/storage/entries/${volumeName}/${entryKey}`,
    );
    const mockResponse = new Response("test");

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    getTokenMock.mockResolvedValue(token);
    const result = await GET(mockRequest, {
      params: Promise.resolve({
        volume: volumeName,
        entries: entryKey.split("/"),
      }),
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_STORAGE_API_HOST}/entries/${volumeName}/${entryKey}`,
      expect.objectContaining({
        method: "GET",
        headers: {
          Authorization: `Session ${token}`,
        },
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it("failed: occured fetch error", async () => {
    const token = "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS";
    const volumeName = "volume";
    const entryKey = "key/sample.txt";
    const mockRequest = new Request(
      `http://localhost/api/storage/entries/${volumeName}/${entryKey}`,
    );

    global.fetch = jest.fn().mockRejectedValue(new Error("failed"));

    getTokenMock.mockResolvedValue(token);

    await expect(
      GET(mockRequest, {
        params: Promise.resolve({
          volume: volumeName,
          entries: entryKey.split("/"),
        }),
      }),
    ).rejects.toThrow("failed");
  });
});
