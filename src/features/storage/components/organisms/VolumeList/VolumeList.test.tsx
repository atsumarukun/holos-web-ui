import { render, screen, waitFor } from "@testing-library/react";
import { VolumeList } from "./VolumeList";
import dayjs from "@/lib/dayjs";
import userEvent from "@testing-library/user-event";

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

const refetchMock = jest.fn();

describe("Storage/Organisms/VolumeList", () => {
  it("renders", () => {
    render(<VolumeList volumes={mockVolumes} refetch={refetchMock} />);
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

  it("calls onSelect when volume checkbox is clicked", async () => {
    render(<VolumeList volumes={mockVolumes} refetch={refetchMock} />);

    await userEvent.click(screen.getAllByRole("button")[2]);

    await waitFor(() => {
      expect(onSelectMock).toHaveBeenCalled();
    });
  });

  it("calls onSelectAll when header checkbox is clicked", async () => {
    render(<VolumeList volumes={mockVolumes} refetch={refetchMock} />);

    await userEvent.click(screen.getAllByRole("button")[0]);

    await waitFor(() => {
      expect(onSelectAllMock).toHaveBeenCalled();
    });
  });

  it("passes selected volumes to SelectedVolumesDropdownMenu", async () => {
    render(<VolumeList volumes={mockVolumes} refetch={refetchMock} />);

    await userEvent.click(screen.getAllByRole("button")[1]);

    await waitFor(() => {
      expect(screen.getByRole("menu")).toHaveTextContent("2 件選択中");
    });
  });
});
