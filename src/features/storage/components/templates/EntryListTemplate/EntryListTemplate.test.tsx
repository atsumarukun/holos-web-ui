import { render, screen } from "@testing-library/react";
import { EntryListTemplate } from "./EntryListTemplate";

const pathnameMock = jest.fn();
const searchParamsMock = jest.fn();
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => pathnameMock(),
  useSearchParams: () => searchParamsMock(),
  useRouter: () => ({ push: pushMock }),
}));

const useEntryListMock = jest.fn();
jest.mock("@/features/storage/hooks/entry-list", () => ({
  useEntryList: () => useEntryListMock(),
}));

describe("Storage/Templates/EntryListTemplate", () => {
  it("renders", () => {
    useEntryListMock.mockReturnValue({
      loading: false,
      success: true,
      entries: [
        {
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      refetch: jest.fn(),
    });

    const { container } = render(
      <EntryListTemplate volumeName="volume" currentKey="key" />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent("エントリー一覧");
    expect(container.querySelector("form")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
    expect(screen.getByText("エントリー名")).toBeInTheDocument();
    expect(screen.getByText("タイプ")).toBeInTheDocument();
    expect(screen.getByText("サイズ")).toBeInTheDocument();
    expect(screen.getByText("最終更新日時")).toBeInTheDocument();
  });
});
