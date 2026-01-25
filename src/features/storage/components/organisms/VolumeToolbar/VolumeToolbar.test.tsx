import { render, screen, waitFor, within } from "@testing-library/react";
import { VolumeToolbar } from "./VolumeToolbar";
import userEvent from "@testing-library/user-event";
import { UseFormProps } from "react-hook-form";

const pathnameMock = jest.fn();
const searchParamsMock = jest.fn();
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => pathnameMock(),
  useSearchParams: () => searchParamsMock(),
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
  successToast: () => successToastMock(),
  errorToast: () => errorToastMock(),
}));

const createVolumeMock = jest.fn();
jest.mock("@/features/storage/actions/create-volume", () => ({
  createVolume: () => createVolumeMock(),
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

    expect(screen.getByText("ボリューム作成")).toBeInTheDocument();
    expect(screen.getByLabelText("ボリューム名")).toBeInTheDocument();
    expect(screen.getByLabelText("パブリック公開")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("does not render the dialog when closed", () => {
    render(<VolumeToolbar refetch={refetchMock} />);
    expect(screen.queryByText("ボリューム作成")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("ボリューム名")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("パブリック公開")).not.toBeInTheDocument();
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
  });

  it("invokes the success handler when create succeeds", async () => {
    createVolumeMock.mockResolvedValue({
      success: true,
      data: {
        name: "holos",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    render(<VolumeToolbar refetch={refetchMock} />);

    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    const dialog = screen.getByRole("dialog");

    await userEvent.type(within(dialog).getByRole("textbox"), "holos");
    await userEvent.click(within(dialog).getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalled();
      expect(resetMock).toHaveBeenCalled();
      expect(refetchMock).toHaveBeenCalled();
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows error when required fields are empty", async () => {
    render(<VolumeToolbar refetch={refetchMock} />);

    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    const dialog = screen.getByRole("dialog");

    await userEvent.click(within(dialog).getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(within(dialog).getByText("必須項目です.")).toBeInTheDocument();
    });
  });

  it("shows error when create fails with error message", async () => {
    createVolumeMock.mockResolvedValue({
      success: false,
      error: "ボリューム名がすでに利用されています.",
    });

    render(<VolumeToolbar refetch={refetchMock} />);

    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    const dialog = screen.getByRole("dialog");

    await userEvent.type(within(dialog).getByRole("textbox"), "holos");
    await userEvent.click(within(dialog).getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(
        within(dialog).getByText("ボリューム名がすでに利用されています."),
      ).toBeInTheDocument();
    });
  });

  it("shows error toast when create fails without error message", async () => {
    createVolumeMock.mockResolvedValue({ success: false });

    render(<VolumeToolbar refetch={refetchMock} />);

    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    const dialog = screen.getByRole("dialog");

    await userEvent.type(within(dialog).getByRole("textbox"), "holos");
    await userEvent.click(within(dialog).getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });
});
