import { refetchContext } from "@/providers/refetch";
import { render, screen, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { DeleteEntryConfirmDialog } from "./DeleteEntryConfirmDialog";
import userEvent from "@testing-library/user-event";
import { errorCode } from "@/lib/errors";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const successToastMock = jest.fn();
const errorToastMock = jest.fn();
jest.mock("@/lib/toast", () => ({
  successToast: (...args: unknown[]) => successToastMock(...args),
  errorToast: (...args: unknown[]) => errorToastMock(...args),
}));

const deleteEntriesMock = jest.fn();
jest.mock("@/features/storage/actions/delete-entries", () => ({
  deleteEntries: () => deleteEntriesMock(),
}));

const onOpenChangeMock = jest.fn();
const refetchMock = jest.fn();

describe("Storage/Organisms/DeleteEntryConfirmDialog", () => {
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
      <DeleteEntryConfirmDialog
        volumeName="volume"
        entryKey="key/sample.txt"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.getByText("エントリー削除")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) =>
          content.includes("「sample.txt」を削除しますか？") &&
          content.includes("削除したエントリーは復元できません."),
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "削除" })).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    renderWithContext(
      <DeleteEntryConfirmDialog
        volumeName="volume"
        entryKey="key/sample.txt"
        open={false}
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.queryByText("エントリー削除")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        (content) =>
          content.includes("「sample.txt」を削除しますか？") &&
          content.includes("削除したエントリーは復元できません."),
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "削除" }),
    ).not.toBeInTheDocument();
  });

  it("invokes the success handler when delete succeeds", async () => {
    deleteEntriesMock.mockResolvedValue({
      "key/sample.txt": {
        error: undefined,
      },
    });

    renderWithContext(
      <DeleteEntryConfirmDialog
        volumeName="volume"
        entryKey="key/sample.txt"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalledWith(
        "エントリーを削除しました.",
      );
      expect(refetchMock).toHaveBeenCalled();
      expect(onOpenChangeMock).toHaveBeenCalled();
    });
  });

  it("shows error toast when delete fails without error message", async () => {
    deleteEntriesMock.mockResolvedValue({
      "key/sample.txt": {
        error: {
          code: errorCode.InternalServerError,
          message: "internal server error",
        },
      },
    });

    renderWithContext(
      <DeleteEntryConfirmDialog
        volumeName="volume"
        entryKey="key/sample.txt"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });

  it("redirect to signin page when unauthenticated", async () => {
    deleteEntriesMock.mockResolvedValue({
      "key/sample.txt": {
        error: {
          code: errorCode.Unauthenticated,
          message: "unauthenticated",
        },
      },
    });

    renderWithContext(
      <DeleteEntryConfirmDialog
        volumeName="volume"
        entryKey="key/sample.txt"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("redirect to signin page when unauthorized", async () => {
    deleteEntriesMock.mockResolvedValue({
      "key/sample.txt": {
        error: {
          code: errorCode.Unauthorized,
          message: "unauthorized",
        },
      },
    });

    renderWithContext(
      <DeleteEntryConfirmDialog
        volumeName="volume"
        entryKey="key/sample.txt"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });
});
