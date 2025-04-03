import { SigninForm } from "@/features/auth/components/organisms/SigninForm";
import { useSignin } from "@/features/auth/hooks/signin";
import { Session } from "@/features/auth/schemas/session";
import { ActionsError, actionsErrorCode } from "@/lib/actions-error";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("@/features/auth/hooks/signin", () => ({
  useSignin: jest.fn(),
}));

describe("SigninForm", () => {
  it("Check rendering", () => {
    jest.mocked(useSignin).mockReturnValue({
      loading: false,
      data: undefined,
      error: undefined,
      onSubmit: jest.fn(),
    });

    const { container, getByPlaceholderText, getByRole } = render(
      <SigninForm />
    );

    expect(container.querySelector("form")).toBeInTheDocument();
    expect(getByPlaceholderText("アカウント名")).toBeInTheDocument();
    expect(getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(getByRole("link", { name: "アカウント作成" })).toBeInTheDocument();
    expect(getByRole("button", { name: "ログイン" })).toBeInTheDocument();
  });

  it("Check error display for invalid input", async () => {
    jest.mocked(useSignin).mockReturnValue({
      loading: false,
      data: undefined,
      error: undefined,
      onSubmit: jest.fn(),
    });

    const { getByRole, getByText } = render(<SigninForm />);

    const submitButton = getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("アカウント名を入力してください.")).toBeInTheDocument();
      expect(getByText("パスワードを入力してください.")).toBeInTheDocument();
    });
  });

  it("Check error display for authentication fails", async () => {
    const err: ActionsError = {
      type: "ActionsError",
      code: actionsErrorCode.Unauthorized,
      message: "unauthorized",
    };
    jest
      .mocked(useSignin)
      .mockImplementation(
        (props?: { onError?: (err?: ActionsError) => void }) => {
          return {
            loading: false,
            data: undefined,
            error: err,
            onSubmit: () => {
              props?.onError?.(err);
            },
          };
        }
      );

    const { getByRole, getByPlaceholderText, getByText } = render(
      <SigninForm />
    );

    const nameInput = getByPlaceholderText("アカウント名");
    fireEvent.change(nameInput, {
      target: { value: "name" },
    });
    const passwordInput = getByPlaceholderText("パスワード");
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });

    const submitButton = getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText("アカウントが存在しないかパスワードが異なります.")
      ).toBeInTheDocument();
    });
  });

  it("Check if page is transitioned", async () => {
    const pushMock = jest.fn();
    jest.mocked(useRouter).mockReturnValue({
      push: pushMock,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    });
    jest
      .mocked(useSignin)
      .mockImplementation(
        (props?: { onCompleted?: (data?: Session) => void }) => {
          return {
            loading: false,
            data: undefined,
            error: undefined,
            onSubmit: () => {
              props?.onCompleted?.();
            },
          };
        }
      );

    const { getByRole, getByPlaceholderText } = render(<SigninForm />);

    const nameInput = getByPlaceholderText("アカウント名");
    fireEvent.change(nameInput, {
      target: { value: "name" },
    });
    const passwordInput = getByPlaceholderText("パスワード");
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });

    const submitButton = getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });
});
