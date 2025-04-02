import { SignupForm } from "@/features/auth/components/organisms/SignupForm";
import { useSignup } from "@/features/auth/hooks/signup";
import { Account } from "@/features/auth/schemas/account";
import { ActionsError, actionsErrorCode } from "@/lib/actions-error";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/features/auth/hooks/signup", () => ({
  useSignup: jest.fn(),
}));

describe("SignupForm", () => {
  it("Check rendering", () => {
    jest.mocked(useSignup).mockReturnValue({
      loading: false,
      data: undefined,
      error: undefined,
      onSubmit: jest.fn(),
    });

    const { container, getByPlaceholderText, getByRole } = render(
      <SignupForm />
    );

    expect(container.querySelector("form")).toBeInTheDocument();
    expect(getByPlaceholderText("アカウント名")).toBeInTheDocument();
    expect(getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(getByPlaceholderText("パスワード(確認)")).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("Check error display for invalid input", async () => {
    jest.mocked(useSignup).mockReturnValue({
      loading: false,
      data: undefined,
      error: undefined,
      onSubmit: jest.fn(),
    });

    const { getByRole, getByPlaceholderText, getByText } = render(
      <SignupForm />
    );

    const confirmPasswordInput = getByPlaceholderText("パスワード(確認)");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "a".repeat(73) },
    });

    const submitButton = getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("3文字以上にしてください.")).toBeInTheDocument();
      expect(getByText("8文字以上にしてください.")).toBeInTheDocument();
      expect(getByText("72文字以下にしてください.")).toBeInTheDocument();
    });
  });

  it("Check error display for duplicate account name", async () => {
    const err: ActionsError = {
      type: "ActionsError",
      code: actionsErrorCode.Conflict,
      message: "conflict",
    };
    jest
      .mocked(useSignup)
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
      <SignupForm />
    );

    const nameInput = getByPlaceholderText("アカウント名");
    fireEvent.change(nameInput, {
      target: { value: "name" },
    });
    const passwordInput = getByPlaceholderText("パスワード");
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });
    const confirmPasswordInput = getByPlaceholderText("パスワード(確認)");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password" },
    });

    const submitButton = getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText("アカウント名がすでに利用されています.")
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
      .mocked(useSignup)
      .mockImplementation(
        (props?: { onCompleted?: (data?: Account) => void }) => {
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

    const { getByRole, getByPlaceholderText } = render(<SignupForm />);

    const nameInput = getByPlaceholderText("アカウント名");
    fireEvent.change(nameInput, {
      target: { value: "name" },
    });
    const passwordInput = getByPlaceholderText("パスワード");
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });
    const confirmPasswordInput = getByPlaceholderText("パスワード(確認)");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password" },
    });

    const submitButton = getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });
});
