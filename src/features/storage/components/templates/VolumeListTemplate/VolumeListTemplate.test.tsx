import { render, screen } from "@testing-library/react";
import { VolumeListTemplate } from "./VolumeListTemplate";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/storage/volumes",
  useSearchParams: () => new URLSearchParams(),
}));

const useVolumeListMock = jest.fn();
jest.mock("@/features/storage/hooks/volume-list", () => ({
  useVolumeList: () => useVolumeListMock(),
}));

describe("Storage/Templates/VolumeListTemplate", () => {
  it("renders", () => {
    useVolumeListMock.mockReturnValue({
      loading: false,
      success: true,
      volumes: [
        {
          name: "holos",
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      refetch: jest.fn(),
    });

    const { container } = render(<VolumeListTemplate />);
    expect(screen.getByRole("heading")).toHaveTextContent("ボリューム一覧");
    expect(container.querySelector("form")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
    expect(screen.getByText("ボリューム名")).toBeInTheDocument();
    expect(screen.getByText("公開状況")).toBeInTheDocument();
    expect(screen.getByText("最終更新日時")).toBeInTheDocument();
  });
});
