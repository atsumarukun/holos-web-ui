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

const getTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  getToken: () => getTokenMock(),
}));

describe("Organisms/Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderWithContext = (accountName: string, token?: string) => {
    getTokenMock.mockReturnValue(token);
    render(
      <accountContext.Provider value={{ accountName: accountName }}>
        <Header />
      </accountContext.Provider>
    );
  };

  it("renders", () => {
    renderWithContext("holos", "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS");
    expect(screen.getByAltText("ロゴ")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "" }).querySelector("svg")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "H" })).toBeInTheDocument();
  });

  it("redirects when signout succeeds", async () => {
    signoutMock.mockResolvedValue({ success: true });

    renderWithContext("holos", "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS");

    await userEvent.click(screen.getByRole("button", { name: "H" }));
    await userEvent.click(screen.getByRole("button", { name: "ログアウト" }));

    await waitFor(async () => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("does not sign out when no token", async () => {
    renderWithContext("holos", undefined);

    await userEvent.click(screen.getByRole("button", { name: "H" }));
    await userEvent.click(screen.getByRole("button", { name: "ログアウト" }));

    await waitFor(async () => {
      expect(signoutMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
