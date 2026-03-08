import { render, screen, waitFor } from "@testing-library/react";
import { UseFormProps } from "react-hook-form";
import { CreateVolumeFormDialog } from "./CreateVolumeFormDialog";
import userEvent from "@testing-library/user-event";
import { refetchContext } from "@/providers/refetch";
import { ReactNode } from "react";

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
    renderWithContext(
      <CreateVolumeFormDialog open onOpenChange={onOpenChangeMock} />,
    );
    expect(screen.getByText("ボリューム作成")).toBeInTheDocument();
    expect(screen.getByLabelText("ボリューム名")).toBeInTheDocument();
    expect(screen.getByLabelText("パブリック公開")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    renderWithContext(
      <CreateVolumeFormDialog open={false} onOpenChange={onOpenChangeMock} />,
    );
    expect(screen.queryByText("ボリューム作成")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("ボリューム名")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("パブリック公開")).not.toBeInTheDocument();
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "作成" }),
    ).not.toBeInTheDocument();
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

    renderWithContext(
      <CreateVolumeFormDialog open onOpenChange={onOpenChangeMock} />,
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
    renderWithContext(
      <CreateVolumeFormDialog open onOpenChange={onOpenChangeMock} />,
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

    renderWithContext(
      <CreateVolumeFormDialog open onOpenChange={onOpenChangeMock} />,
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

    renderWithContext(
      <CreateVolumeFormDialog open onOpenChange={onOpenChangeMock} />,
    );

    await userEvent.type(screen.getByRole("textbox"), "holos");
    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });
});
