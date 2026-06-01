import { refetchContext } from "@/providers/refetch";
import { render, screen, waitFor } from "@testing-library/react";
import { EntryDestinationDialog } from "./EntryDestinationDialog";
import { errorCode } from "@/lib/errors";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";

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

const useEntryDestinationListMock = jest.fn();
jest.mock("@/features/storage/hooks/entry-destination-list", () => ({
  useEntryDestinationList: () => useEntryDestinationListMock(),
}));

const copyEntriesMock = jest.fn();
jest.mock("@/features/storage/actions/copy-entries", () => ({
  copyEntries: () => copyEntriesMock(),
}));

const updateEntriesMock = jest.fn();
jest.mock("@/features/storage/actions/update-entries", () => ({
  updateEntries: () => updateEntriesMock(),
}));

const onOpenChangeMock = jest.fn();
const refetchMock = jest.fn();

describe("Storage/Organisms/EntryDestinationDialog", () => {
  const renderWithContext = (component: ReactNode) => {
    render(
      <refetchContext.Provider
        value={{ refetch: refetchMock, setRefetch: jest.fn() }}
      >
        {component}
      </refetchContext.Provider>,
    );
  };

  it("renders in copy mode", () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [
        {
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="copy"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    expect(screen.getByText(`エントリーコピー`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "volume" })).toBeInTheDocument();
    expect(screen.getByText("エントリー名")).toBeInTheDocument();
    expect(screen.getByText("sample.txt")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ここにコピー" }),
    ).toBeInTheDocument();
  });

  it("renders in move mode", () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [
        {
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="move"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    expect(screen.getByText(`エントリー移動`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "volume" })).toBeInTheDocument();
    expect(screen.getByText("エントリー名")).toBeInTheDocument();
    expect(screen.getByText("sample.txt")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ここに移動" }),
    ).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [
        {
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="copy"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open={false}
        onOpenChange={onOpenChangeMock}
      />,
    );

    expect(screen.queryByText(`エントリーコピー`)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "volume" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("エントリー名")).not.toBeInTheDocument();
    expect(screen.queryByText("sample.txt")).not.toBeInTheDocument();
  });

  it("renders error message when entry fetch fails", () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [],
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="copy"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    expect(
      screen.getByText("エントリーの取得に失敗しました"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("再度ダイアログを読み込み直してください."),
    ).toBeInTheDocument();
  });

  it("redirect to signin page when unauthenticated", () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [],
      error: {
        code: errorCode.Unauthenticated,
        message: "unauthenticated",
      },
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="copy"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    expect(pushMock).toHaveBeenCalledWith("/auth/signin");
  });

  it("redirect to signin page when unauthorized", () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [],
      error: {
        code: errorCode.Unauthorized,
        message: "unauthorized",
      },
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="copy"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    expect(pushMock).toHaveBeenCalledWith("/auth/signin");
  });

  it("invokes the success handler when action succeeds", async () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [
        {
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    copyEntriesMock.mockResolvedValue({
      "key/sample.txt": {
        data: {
          key: "key/copy.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
      },
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="copy"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "ここにコピー" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalledWith(
        "エントリーをコピーしました.",
      );
      expect(refetchMock).toHaveBeenCalled();
      expect(onOpenChangeMock).toHaveBeenCalled();
    });
  });

  it("shows error when action fails with error message", async () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [
        {
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    updateEntriesMock.mockResolvedValue({
      "key/sample.txt": {
        error: {
          code: errorCode.InternalServerError,
          message: "internal server error",
        },
      },
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="move"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "ここに移動" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });

  it("redirect to signin page when action returns unauthenticated", async () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [
        {
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    copyEntriesMock.mockResolvedValue({
      "key/sample.txt": {
        error: {
          code: errorCode.Unauthenticated,
          message: "unauthenticated",
        },
      },
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="copy"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "ここにコピー" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("redirect to signin page when action returns unauthorized", async () => {
    useEntryDestinationListMock.mockReturnValue({
      loading: false,
      entries: [
        {
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    copyEntriesMock.mockResolvedValue({
      "key/sample.txt": {
        error: {
          code: errorCode.Unauthorized,
          message: "unauthorized",
        },
      },
    });

    renderWithContext(
      <EntryDestinationDialog
        mode="copy"
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "ここにコピー" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });
});
