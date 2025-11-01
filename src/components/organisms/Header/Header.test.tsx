import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Header } from "./Header";
import { accountContext } from "@/providers/account";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const signoutMock = jest.fn();
jest.mock("@/features/auth/actions/signout", () => ({
  signout: (token: string) => signoutMock(token),
}));

describe("Organisms/Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderWithContext = (accountName: string) => {
    render(
      <accountContext.Provider value={{ accountName: accountName }}>
        <Header />
      </accountContext.Provider>
    );
  };

  it("renders", () => {
    renderWithContext("holos");
    expect(screen.getByAltText("ロゴ")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "" }).querySelector("svg")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "H" })).toBeInTheDocument();
  });

  it("redirects when signout succeeds", async () => {
    signoutMock.mockResolvedValue({ success: true });

    renderWithContext("holos");

    await userEvent.click(screen.getByRole("button", { name: "H" }));
    await userEvent.click(screen.getByRole("button", { name: "ログアウト" }));

    await waitFor(async () => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });
});
