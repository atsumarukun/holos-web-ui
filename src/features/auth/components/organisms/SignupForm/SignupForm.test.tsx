import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";
import { SignupRequest } from "@/features/auth/actions/signup";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const signupMock = jest.fn();
jest.mock("@/features/auth/actions/signup", () => ({
  signup: (data: SignupRequest) => signupMock(data),
}));

describe("Organisms/AuthSignupForm", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders", () => {
    render(<SignupForm />);
    expect(screen.getByPlaceholderText("アカウント名")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード(確認)")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("redirects when signup succeeds", async () => {
    signupMock.mockResolvedValue({ success: true });

    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("アカウント名"), "holos");
    await userEvent.type(screen.getByPlaceholderText("パスワード"), "password");
    await userEvent.type(
      screen.getByPlaceholderText("パスワード(確認)"),
      "password"
    );

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("shows error when required fields are empty", async () => {
    render(<SignupForm />);
    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("3文字以上にしてください.")).toBeInTheDocument();
      expect(screen.getAllByText("8文字以上にしてください.").length).toBe(2);
    });
  });

  it("shows error when passwords do not match", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("アカウント名"), "holos");
    await userEvent.type(
      screen.getByPlaceholderText("パスワード"),
      "password1"
    );
    await userEvent.type(
      screen.getByPlaceholderText("パスワード(確認)"),
      "password2"
    );

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getAllByText("パスワードが一致しません.").length).toBe(2);
    });
  });

  it("shows error when signup fails with error message", async () => {
    signupMock.mockResolvedValue({
      success: false,
      error: "アカウント名がすでに利用されています.",
    });

    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("アカウント名"), "holos");
    await userEvent.type(screen.getByPlaceholderText("パスワード"), "password");
    await userEvent.type(
      screen.getByPlaceholderText("パスワード(確認)"),
      "password"
    );

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByText("アカウント名がすでに利用されています.")
      ).toBeInTheDocument();
    });
  });
});
