import { render, screen, waitFor } from "@testing-library/react";
import { UseFormProps } from "react-hook-form";
import { CreateVolumeFormDialog } from "./CreateVolumeFormDialog";
import userEvent from "@testing-library/user-event";

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

const onOpenChangeMock = jest.fn();
const refetchMock = jest.fn();

describe("Storage/Organisms/CreateVolumeFormDialog", () => {
  it("renders", () => {
    render(
      <CreateVolumeFormDialog
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );
    expect(screen.getByText("ボリューム作成")).toBeInTheDocument();
    expect(screen.getByLabelText("ボリューム名")).toBeInTheDocument();
    expect(screen.getByLabelText("パブリック公開")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <CreateVolumeFormDialog
        open={false}
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );
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

    render(
      <CreateVolumeFormDialog
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "holos");
    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalled();
      expect(resetMock).toHaveBeenCalled();
      expect(refetchMock).toHaveBeenCalled();
      expect(onOpenChangeMock).toHaveBeenCalled();
    });
  });

  it("shows error when required fields are empty", async () => {
    render(
      <CreateVolumeFormDialog
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(screen.getByText("必須項目です.")).toBeInTheDocument();
    });
  });

  it("shows error when create fails with error message", async () => {
    createVolumeMock.mockResolvedValue({
      success: false,
      error: "ボリューム名がすでに利用されています.",
    });

    render(
      <CreateVolumeFormDialog
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "holos");
    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(
        screen.getByText("ボリューム名がすでに利用されています."),
      ).toBeInTheDocument();
    });
  });

  it("shows error toast when create fails without error message", async () => {
    createVolumeMock.mockResolvedValue({ success: false });

    render(
      <CreateVolumeFormDialog
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "holos");
    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });
});
