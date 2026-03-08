import { render, screen, waitFor } from "@testing-library/react";
import { UpdateVolumeFormDialog } from "./UpdateVolumeFormDialog";
import { UseFormProps } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { refetchContext } from "@/providers/refetch";

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

const updateVolumeMock = jest.fn();
jest.mock("@/features/storage/actions/update-volume", () => ({
  updateVolume: () => updateVolumeMock(),
}));

const onOpenChangeMock = jest.fn();
const refetchMock = jest.fn();

describe("Storage/Organisms/UpdateVolumeFormDialog", () => {
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
    const name = "holos";

    renderWithContext(
      <UpdateVolumeFormDialog
        defaultValues={{ name: name, isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.getByText(`「${name}」を編集`)).toBeInTheDocument();
    expect(screen.getByLabelText("ボリューム名")).toBeInTheDocument();
    expect(screen.getByLabelText("パブリック公開")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "更新" })).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const name = "holos";

    renderWithContext(
      <UpdateVolumeFormDialog
        defaultValues={{ name: name, isPublic: true }}
        open={false}
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.queryByText(`「${name}」を編集`)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("ボリューム名")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("パブリック公開")).not.toBeInTheDocument();
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "更新" }),
    ).not.toBeInTheDocument();
  });

  it("invokes the success handler when update succeeds", async () => {
    updateVolumeMock.mockResolvedValue({
      success: true,
      data: {
        name: "update",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    renderWithContext(
      <UpdateVolumeFormDialog
        defaultValues={{ name: "holos", isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "update");
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalled();
      expect(resetMock).toHaveBeenCalled();
      expect(refetchMock).toHaveBeenCalled();
      expect(onOpenChangeMock).toHaveBeenCalled();
    });
  });

  it("shows error when required fields are empty", async () => {
    renderWithContext(
      <UpdateVolumeFormDialog
        defaultValues={{ name: "holos", isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.clear(screen.getByRole("textbox"));
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(screen.getByText("必須項目です.")).toBeInTheDocument();
    });
  });

  it("shows error when update fails with error message", async () => {
    updateVolumeMock.mockResolvedValue({
      success: false,
      error: "ボリューム名がすでに利用されています.",
    });

    renderWithContext(
      <UpdateVolumeFormDialog
        defaultValues={{ name: "holos", isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "update");
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(
        screen.getByText("ボリューム名がすでに利用されています."),
      ).toBeInTheDocument();
    });
  });

  it("shows error toast when update fails without error message", async () => {
    updateVolumeMock.mockResolvedValue({ success: false });

    renderWithContext(
      <UpdateVolumeFormDialog
        defaultValues={{ name: "holos", isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "update");
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });
});
