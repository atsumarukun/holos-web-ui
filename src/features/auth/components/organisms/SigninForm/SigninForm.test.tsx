import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

const setTokenMock = jest.fn();
jest.mock("@/actions/token", () => ({
  setToken: (token: string) => setTokenMock(token),
}));

describe("Organisms/AuthSigninForm", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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

    fireEvent.change(screen.getByPlaceholderText("アカウント名"), {
      target: { value: "holos" },
    });
    fireEvent.change(screen.getByPlaceholderText("パスワード"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(setTokenMock).toHaveBeenCalledWith(
        "1Ty1HKTPKTt8xEi-_3HTbWf2SCHOdqOS"
      );
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  it("shows error when required fields are empty", async () => {
    render(<SigninForm />);
    fireEvent.click(screen.getByRole("button"));

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

    fireEvent.change(screen.getByPlaceholderText("アカウント名"), {
      target: { value: "holos" },
    });
    fireEvent.change(screen.getByPlaceholderText("パスワード"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByText("アカウントが存在しないかパスワードが異なります.")
      ).toBeInTheDocument();
    });
  });
});
