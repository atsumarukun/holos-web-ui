import { refetchContext } from "@/providers/refetch";
import { render, screen, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { UseFormProps } from "react-hook-form";
import { UpdateEntryFormDialog } from "./UpdateEntryFormDialog";
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

const updateEntryMock = jest.fn();
jest.mock("@/features/storage/actions/update-entry", () => ({
  updateEntry: () => updateEntryMock(),
}));

const onOpenChangeMock = jest.fn();
const refetchMock = jest.fn();

describe("Storage/Organisms/UpdateEntryFormDialog", () => {
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
    const name = "sample.txt";
    renderWithContext(
      <UpdateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        defaultValues={{ name: name }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.getByText(`「${name}」を編集`)).toBeInTheDocument();
    expect(screen.getByLabelText("エントリー名")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getAllByText("必須")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "更新" })).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const name = "sample.txt";

    renderWithContext(
      <UpdateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        defaultValues={{ name: name }}
        open={false}
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.queryByText(`「${name}」を編集`)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("エントリー名")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryAllByText("必須")).toHaveLength(0);
    expect(
      screen.queryByRole("button", { name: "更新" }),
    ).not.toBeInTheDocument();
  });

  it("invokes the success handler when update succeeds", async () => {
    const name = "sample.txt";

    updateEntryMock.mockResolvedValue({
      data: {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
      },
    });

    renderWithContext(
      <UpdateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        defaultValues={{ name: name }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "update.txt");
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalled();
      expect(refetchMock).toHaveBeenCalled();
      expect(resetMock).toHaveBeenCalled();
      expect(onOpenChangeMock).toHaveBeenCalled();
    });
  });

  it("shows error when required fields are empty", async () => {
    const name = "sample.txt";

    renderWithContext(
      <UpdateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        defaultValues={{ name: name }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.clear(screen.getByRole("textbox"));
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(screen.getByText("必須項目です.")).toBeInTheDocument();
    });
  });

  it("shows error when update fails with error message", async () => {
    const name = "sample.txt";

    updateEntryMock.mockResolvedValue({
      error: {
        code: errorCode.Duplicate,
        message: "entry key already in use",
      },
    });

    renderWithContext(
      <UpdateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        defaultValues={{ name: name }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "update.txt");
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(
        screen.getByText("エントリー名がすでに利用されています."),
      ).toBeInTheDocument();
    });
  });

  it("shows error toast when update fails without error message", async () => {
    const name = "sample.txt";

    updateEntryMock.mockResolvedValue({
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
    });

    renderWithContext(
      <UpdateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        defaultValues={{ name: name }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "update.txt");
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });

  it("redirect to signin page when unauthenticated", async () => {
    const name = "sample.txt";

    updateEntryMock.mockResolvedValue({
      error: {
        code: errorCode.Unauthenticated,
        message: "unauthenticated",
      },
    });

    renderWithContext(
      <UpdateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        defaultValues={{ name: name }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "update.txt");
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("redirect to signin page when unauthorized", async () => {
    const name = "sample.txt";

    updateEntryMock.mockResolvedValue({
      error: {
        code: errorCode.Unauthorized,
        message: "unauthorized",
      },
    });

    renderWithContext(
      <UpdateEntryFormDialog
        volumeName="volume"
        currentKey="key"
        defaultValues={{ name: name }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "update.txt");
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });
});
