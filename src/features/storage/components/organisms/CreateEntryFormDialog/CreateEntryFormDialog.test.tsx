import { refetchContext } from "@/providers/refetch";
import { render, screen, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { UseFormProps } from "react-hook-form";
import { CreateEntryFormDialog } from "./CreateEntryFormDialog";
import userEvent from "@testing-library/user-event";
import { errorCode } from "@/lib/errors";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const resetMock = jest.fn();
jest.mock("react-hook-form", () => {
  const actual = jest.requireActual("react-hook-form");
  return {
    ...actual,
    useForm: (props: UseFormProps) => ({
      ...actual.useForm(props),
      reset: () => resetMock(),
    }),
  };
});

const successToastMock = jest.fn();
const errorToastMock = jest.fn();
jest.mock("@/lib/toast", () => ({
  successToast: (...args: unknown[]) => successToastMock(...args),
  errorToast: (...args: unknown[]) => errorToastMock(...args),
}));

const createEntryMock = jest.fn();
jest.mock("@/features/storage/actions/create-entry", () => ({
  createEntry: () => createEntryMock(),
}));

const onOpenChangeMock = jest.fn();
const refetchMock = jest.fn();

describe("Storage/Organisms/CreateEntryFormDialog", () => {
  const renderWithContext = (component: ReactNode) => {
    render(
      <refetchContext.Provider
        value={{ refetch: refetchMock, setRefetch: jest.fn() }}
      >
        {component}
      </refetchContext.Provider>,
    );
  };

  it("renders", () => {
    renderWithContext(
      <CreateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.getByText("エントリー作成")).toBeInTheDocument();
    expect(screen.getByLabelText("エントリー名")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("ファイル")).toBeInTheDocument();
    expect(document.querySelector('input[type="file"]')).toBeInTheDocument();
    expect(
      screen.getByText("ファイルをドラッグ&ドロップしてください."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ファイルを選択" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("必須")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    renderWithContext(
      <CreateEntryFormDialog
        volumeName="volume"
        currentKey=""
        open={false}
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.queryByText("エントリー作成")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("エントリー名")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByText("ファイル")).not.toBeInTheDocument();
    expect(
      document.querySelector('input[type="file"]'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("ファイルをドラッグ&ドロップしてください."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "ファイルを選択" }),
    ).not.toBeInTheDocument();
    expect(screen.queryAllByText("必須")).toHaveLength(0);
    expect(
      screen.queryByRole("button", { name: "作成" }),
    ).not.toBeInTheDocument();
  });

  it("invokes the success handler when create succeeds", async () => {
    createEntryMock.mockResolvedValue({
      data: {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    });

    renderWithContext(
      <CreateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "sample.txt");
    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalledWith(
        "エントリーを作成しました.",
      );
      expect(refetchMock).toHaveBeenCalled();
      expect(resetMock).toHaveBeenCalled();
      expect(onOpenChangeMock).toHaveBeenCalled();
    });
  });

  it("shows error when required fields are empty", async () => {
    renderWithContext(
      <CreateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(screen.getByText("必須項目です.")).toBeInTheDocument();
    });
  });

  it("shows error when create fails with error message", async () => {
    createEntryMock.mockResolvedValue({
      error: {
        code: errorCode.Duplicate,
        message: "entry key already in use",
      },
    });

    renderWithContext(
      <CreateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );
    await userEvent.type(screen.getByRole("textbox"), "key");
    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(
        screen.getByText("エントリー名がすでに利用されています."),
      ).toBeInTheDocument();
    });
  });

  it("shows error toast when create fails without error message", async () => {
    createEntryMock.mockResolvedValue({
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
    });

    renderWithContext(
      <CreateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "key");
    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });

  it("redirect to signin page when unauthenticated", async () => {
    createEntryMock.mockResolvedValue({
      error: {
        code: errorCode.Unauthenticated,
        message: "unauthenticated",
      },
    });

    renderWithContext(
      <CreateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "key");
    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("redirect to signin page when unauthorized", async () => {
    createEntryMock.mockResolvedValue({
      error: {
        code: errorCode.Unauthorized,
        message: "unauthorized",
      },
    });

    renderWithContext(
      <CreateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "key");
    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });
});
