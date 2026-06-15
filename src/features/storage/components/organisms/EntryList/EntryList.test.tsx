import { refetchContext } from "@/providers/refetch";
import { render, screen, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { EntryList } from "./EntryList";
import dayjs from "@/lib/dayjs";
import { errorCode } from "@/lib/errors";
import userEvent from "@testing-library/user-event";

const now = new Date();
const mockEntries = [
  {
    key: "key/sample",
    size: 4,
    type: "folder",
    createdAt: now,
    updatedAt: now,
  },
  {
    key: "key/sample.txt",
    size: 4,
    type: "text/plain; charset=utf-8",
    createdAt: now,
    updatedAt: now,
  },
];

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const useEntryListMock = jest.fn();
jest.mock("@/features/storage/hooks/entry-list", () => ({
  useEntryList: () => useEntryListMock(),
}));

const onSelectMock = jest.fn();
const onSelectAllMock = jest.fn();
jest.mock("@/features/storage/hooks/select-entry", () => ({
  useEntrySelection: () => ({
    isSelectedAll: false,
    selectedEntryKeys: mockEntries.map((entry) => entry.key),
    onSelect: () => onSelectMock(),
    onSelectAll: () => onSelectAllMock(),
  }),
}));

describe("Storage/Organisms/EntryList", () => {
  const renderWithContext = (component: ReactNode) => {
    return render(
      <refetchContext.Provider
        value={{ refetch: jest.fn(), setRefetch: jest.fn() }}
      >
        {component}
      </refetchContext.Provider>,
    );
  };

  it("renders", () => {
    useEntryListMock.mockReturnValue({
      loading: false,
      entries: mockEntries,
      refetch: jest.fn(),
    });

    renderWithContext(<EntryList volumeName="volume" currentKey="key" />);

    expect(screen.getByText("エントリー名")).toBeInTheDocument();
    expect(screen.getByText("タイプ")).toBeInTheDocument();
    expect(screen.getByText("サイズ")).toBeInTheDocument();
    expect(screen.getByText("最終更新日時")).toBeInTheDocument();

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getAllByRole("button")).toHaveLength(6);

    expect(screen.getByText("sample")).toBeInTheDocument();
    expect(screen.getByText("sample.txt")).toBeInTheDocument();

    expect(screen.getByText("folder")).toBeInTheDocument();
    expect(screen.getByText("text/plain; charset=utf-8")).toBeInTheDocument();

    expect(screen.getByText("-----")).toBeInTheDocument();
    expect(screen.getByText("4 B")).toBeInTheDocument();

    expect(
      screen.getAllByText(
        dayjs(now).tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm:ss"),
      ),
    ).toHaveLength(2);
  });

  it("renders nothing while loading", () => {
    useEntryListMock.mockReturnValue({
      loading: true,
      entries: [],
      refetch: jest.fn(),
    });

    const { container } = renderWithContext(
      <EntryList volumeName="volume" currentKey="key" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders error message when entry fetch fails", () => {
    useEntryListMock.mockReturnValue({
      loading: false,
      entries: [],
      error: {
        code: errorCode.InternalServerError,
        message: "internal server error",
      },
      refetch: jest.fn(),
    });

    renderWithContext(<EntryList volumeName="volume" currentKey="key" />);

    expect(
      screen.getByText("エントリーの取得に失敗しました"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("再度ページを読み込み直してください."),
    ).toBeInTheDocument();
  });

  it("renders empty state when no entries exist", () => {
    useEntryListMock.mockReturnValue({
      loading: false,
      entries: [],
      refetch: jest.fn(),
    });

    renderWithContext(<EntryList volumeName="volume" currentKey="key" />);

    expect(screen.getByText("エントリーが存在しません")).toBeInTheDocument();
    expect(
      screen.getByText("作成ボタンをから作成してください."),
    ).toBeInTheDocument();
  });

  it("calls onSelect when entry checkbox is clicked", async () => {
    useEntryListMock.mockReturnValue({
      loading: false,
      entries: mockEntries,
      refetch: jest.fn(),
    });

    renderWithContext(<EntryList volumeName="volume" currentKey="key" />);

    await userEvent.click(screen.getAllByRole("button")[2]);

    await waitFor(() => {
      expect(onSelectMock).toHaveBeenCalled();
    });
  });

  it("calls onSelectAll when header checkbox is clicked", async () => {
    useEntryListMock.mockReturnValue({
      loading: false,
      entries: mockEntries,
      refetch: jest.fn(),
    });

    renderWithContext(<EntryList volumeName="volume" currentKey="key" />);

    await userEvent.click(screen.getAllByRole("button")[0]);

    await waitFor(() => {
      expect(onSelectAllMock).toHaveBeenCalled();
    });
  });

  it("passes selected entries to SelectedEntriesDropdownMenu", async () => {
    useEntryListMock.mockReturnValue({
      loading: false,
      entries: mockEntries,
      refetch: jest.fn(),
    });

    renderWithContext(<EntryList volumeName="volume" currentKey="key" />);

    await userEvent.click(screen.getAllByRole("button")[1]);

    await waitFor(() => {
      expect(screen.getByRole("menu")).toHaveTextContent("2 件選択中");
    });
  });

  it("redirect to signin page when unauthenticated", async () => {
    useEntryListMock.mockReturnValue({
      loading: false,
      entries: [],
      error: { code: errorCode.Unauthenticated, message: "unauthenticated" },
      refetch: jest.fn(),
    });

    renderWithContext(<EntryList volumeName="volume" currentKey="key" />);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("redirect to signin page when unauthorized", async () => {
    useEntryListMock.mockReturnValue({
      loading: false,
      volumes: [],
      error: { code: errorCode.Unauthorized, message: "unauthorized" },
      refetch: jest.fn(),
    });

    renderWithContext(<EntryList volumeName="volume" currentKey="key" />);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });
});
