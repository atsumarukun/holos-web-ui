import { render, screen } from "@testing-library/react";
import { VolumeToolbar } from "./VolumeToolbar";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { refetchContext } from "@/providers/refetch";

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
    renderWithContext(<VolumeToolbar />);
    expect(screen.getByPlaceholderText("検索")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
  });

  it("renders the dialog when opened", async () => {
    renderWithContext(<VolumeToolbar />);

    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render the dialog when closed", () => {
    renderWithContext(<VolumeToolbar />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
