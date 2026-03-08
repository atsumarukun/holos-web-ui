import { render, screen, waitFor } from "@testing-library/react";
import { VolumeList } from "./VolumeList";
import dayjs from "@/lib/dayjs";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { refetchContext } from "@/providers/refetch";

const now = new Date();
const mockVolumes = [
  {
    name: "holos",
    isPublic: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "test",
    isPublic: false,
    createdAt: now,
    updatedAt: now,
  },
];

const useVolumeListMock = jest.fn();
jest.mock("@/features/storage/hooks/volume-list", () => ({
  useVolumeList: () => useVolumeListMock(),
}));

const onSelectMock = jest.fn();
const onSelectAllMock = jest.fn();
jest.mock("@/features/storage/hooks/select-volume", () => ({
  useVolumeSelection: () => ({
    isSelectedAll: false,
    selectedVolumes: mockVolumes,
    onSelect: () => onSelectMock(),
    onSelectAll: () => onSelectAllMock(),
  }),
}));

describe("Storage/Organisms/VolumeList", () => {
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
    useVolumeListMock.mockReturnValue({
      loading: false,
      success: true,
      volumes: mockVolumes,
      refetch: jest.fn(),
    });

    renderWithContext(<VolumeList />);

    expect(screen.getByText("ボリューム名")).toBeInTheDocument();
    expect(screen.getByText("公開状況")).toBeInTheDocument();
    expect(screen.getByText("最終更新日時")).toBeInTheDocument();

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getAllByRole("button")).toHaveLength(6);

    expect(screen.getByText("holos")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();

    expect(screen.getByText("PUBLIC")).toBeInTheDocument();
    expect(screen.getByText("PRIVATE")).toBeInTheDocument();

    expect(
      screen.getAllByText(
        dayjs(now).tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm:ss"),
      ),
    ).toHaveLength(2);
  });

  it("renders nothing while loading", () => {
    useVolumeListMock.mockReturnValue({
      loading: true,
      success: false,
      volumes: [],
      refetch: jest.fn(),
    });

    const { container } = renderWithContext(<VolumeList />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders error message when volume fetch fails", () => {
    useVolumeListMock.mockReturnValue({
      loading: false,
      success: false,
      volumes: [],
      refetch: jest.fn(),
    });

    renderWithContext(<VolumeList />);

    expect(
      screen.getByText("ボリュームの取得に失敗しました"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("再度ページを読み込み直してください."),
    ).toBeInTheDocument();
  });

  it("renders empty state when no volumes exist", () => {
    useVolumeListMock.mockReturnValue({
      loading: false,
      success: true,
      volumes: [],
      refetch: jest.fn(),
    });

    renderWithContext(<VolumeList />);

    expect(screen.getByText("ボリュームが存在しません")).toBeInTheDocument();
    expect(
      screen.getByText("作成ボタンをから作成してください."),
    ).toBeInTheDocument();
  });

  it("calls onSelect when volume checkbox is clicked", async () => {
    useVolumeListMock.mockReturnValue({
      loading: false,
      success: true,
      volumes: mockVolumes,
      refetch: jest.fn(),
    });

    renderWithContext(<VolumeList />);

    await userEvent.click(screen.getAllByRole("button")[2]);

    await waitFor(() => {
      expect(onSelectMock).toHaveBeenCalled();
    });
  });

  it("calls onSelectAll when header checkbox is clicked", async () => {
    useVolumeListMock.mockReturnValue({
      loading: false,
      success: true,
      volumes: mockVolumes,
      refetch: jest.fn(),
    });

    renderWithContext(<VolumeList />);

    await userEvent.click(screen.getAllByRole("button")[0]);

    await waitFor(() => {
      expect(onSelectAllMock).toHaveBeenCalled();
    });
  });

  it("passes selected volumes to SelectedVolumesDropdownMenu", async () => {
    useVolumeListMock.mockReturnValue({
      loading: false,
      success: true,
      volumes: mockVolumes,
      refetch: jest.fn(),
    });

    renderWithContext(<VolumeList />);

    await userEvent.click(screen.getAllByRole("button")[1]);

    await waitFor(() => {
      expect(screen.getByRole("menu")).toHaveTextContent("2 件選択中");
    });
  });
});
