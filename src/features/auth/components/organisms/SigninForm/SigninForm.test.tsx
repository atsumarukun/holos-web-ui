import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { SigninForm } from "./SigninForm";
import { SigninRequest } from "@/features/auth/actions/signin";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const signinMock = jest.fn();
jest.mock("@/features/auth/actions/signin", () => ({
  signin: (data: SigninRequest) => signinMock(data),
}));

describe("Auth/Organisms/SigninForm", () => {
  it("renders", () => {
    render(<SigninForm />);
    expect(screen.getByPlaceholderText("アカウント名")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("redirects when signin succeeds", async () => {
    signinMock.mockResolvedValue({
      success: true,
      data: { token: "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS" },
    });

    render(<SigninForm />);

    await userEvent.type(screen.getByPlaceholderText("アカウント名"), "holos");
    await userEvent.type(screen.getByPlaceholderText("パスワード"), "password");

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  it("shows error when required fields are empty", async () => {
    render(<SigninForm />);
    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getAllByText("必須項目です.").length).toBe(2);
    });
  });

  it("shows error when signin fails with error message", async () => {
    signinMock.mockResolvedValue({
      success: false,
      error: "アカウントが存在しないかパスワードが異なります.",
    });

    render(<SigninForm />);

    await userEvent.type(screen.getByPlaceholderText("アカウント名"), "holos");
    await userEvent.type(screen.getByPlaceholderText("パスワード"), "password");

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByText("アカウントが存在しないかパスワードが異なります.")
      ).toBeInTheDocument();
    });
  });
});
