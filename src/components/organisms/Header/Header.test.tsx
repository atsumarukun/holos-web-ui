import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Header } from "./Header";
import { accountContext } from "@/providers/account";
import { errorCode } from "@/lib/errors";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const successToastMock = jest.fn();
const errorToastMock = jest.fn();
jest.mock("@/lib/toast", () => ({
  successToast: () => successToastMock(),
  errorToast: () => errorToastMock(),
}));

const signoutMock = jest.fn();
jest.mock("@/features/auth/actions/signout", () => ({
  signout: (token: string) => signoutMock(token),
}));

describe("Common/Organisms/Header", () => {
  const renderWithContext = (accountName: string) => {
    render(
      <accountContext.Provider value={{ accountName: accountName }}>
        <Header />
      </accountContext.Provider>,
    );
  };

  it("renders", () => {
    renderWithContext("holos");
    expect(
      screen.getByRole("button", { name: "" }).querySelector("svg"),
    ).toBeInTheDocument();
    expect(screen.getByAltText("ロゴ")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "" }).querySelector("svg"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "H" })).toBeInTheDocument();
  });

  it("redirects when signout succeeds", async () => {
    signoutMock.mockResolvedValue({});

    renderWithContext("holos");

    await userEvent.click(screen.getByRole("button", { name: "H" }));
    await userEvent.click(screen.getByRole("button", { name: "ログアウト" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("redirects when signout failed", async () => {
    signoutMock.mockResolvedValue({
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
    });

    renderWithContext("holos");

    await userEvent.click(screen.getByRole("button", { name: "H" }));
    await userEvent.click(screen.getByRole("button", { name: "ログアウト" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });
});
