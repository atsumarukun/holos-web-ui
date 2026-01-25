import { render, screen } from "@testing-library/react";
import { VolumeToolbar } from "./VolumeToolbar";
import userEvent from "@testing-library/user-event";

const pathnameMock = jest.fn();
const searchParamsMock = jest.fn();
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => pathnameMock(),
  useSearchParams: () => searchParamsMock(),
  useRouter: () => ({ push: pushMock }),
}));

const refetchMock = jest.fn();

describe("Storage/Organisms/VolumeToolbar", () => {
  it("renders", () => {
    render(<VolumeToolbar refetch={refetchMock} />);
    expect(screen.getByPlaceholderText("検索")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
  });

  it("renders the dialog when opened", async () => {
    render(<VolumeToolbar refetch={refetchMock} />);

    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render the dialog when closed", () => {
    render(<VolumeToolbar refetch={refetchMock} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
