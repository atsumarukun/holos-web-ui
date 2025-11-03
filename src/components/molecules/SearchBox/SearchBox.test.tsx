import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { SearchBox } from "./SearchBox";

const pathnameMock = jest.fn();
const searchParamsMock = jest.fn();
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => pathnameMock(),
  useSearchParams: () => searchParamsMock(),
  useRouter: () => ({ push: pushMock }),
}));

describe("Molecules/SearchBox", () => {
  it("renders", () => {
    render(<SearchBox />);
    expect(screen.getByPlaceholderText("検索")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "" }).querySelector("svg")
    ).toBeInTheDocument();
  });

  it("adds the search parameter when a keyword is entered", async () => {
    pathnameMock.mockReturnValue("/test");
    searchParamsMock.mockReturnValue(
      new URLSearchParams("sort=name&order=desc")
    );

    render(<SearchBox />);

    await userEvent.type(screen.getByPlaceholderText("検索"), "holos");
    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(
        "/test?sort=name&order=desc&search=holos"
      );
    });
  });

  it("updates the existing search parameter when a new keyword is entered", async () => {
    pathnameMock.mockReturnValue("/test");
    searchParamsMock.mockReturnValue(
      new URLSearchParams("sort=name&order=desc&search=holos")
    );

    render(<SearchBox />);

    await userEvent.type(screen.getByPlaceholderText("検索"), "update");
    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(
        "/test?sort=name&order=desc&search=update"
      );
    });
  });

  it("removes the search parameter when the keyword is cleared", async () => {
    pathnameMock.mockReturnValue("/test");
    searchParamsMock.mockReturnValue(
      new URLSearchParams("sort=name&order=desc&search=holos")
    );

    render(<SearchBox />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/test?sort=name&order=desc");
    });
  });
});
