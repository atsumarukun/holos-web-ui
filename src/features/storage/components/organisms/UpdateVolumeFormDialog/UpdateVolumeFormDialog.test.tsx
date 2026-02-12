import { render, screen, waitFor } from "@testing-library/react";
import { UpdateVolumeFormDialog } from "./UpdateVolumeFormDialog";
import { UseFormProps } from "react-hook-form";
import userEvent from "@testing-library/user-event";

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
  it("renders", () => {
    const name = "holos";

    render(
      <UpdateVolumeFormDialog
        defaultValues={{ name: name, isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
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

    render(
      <UpdateVolumeFormDialog
        defaultValues={{ name: name, isPublic: true }}
        open={false}
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
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

    render(
      <UpdateVolumeFormDialog
        defaultValues={{ name: "holos", isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
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
    render(
      <UpdateVolumeFormDialog
        defaultValues={{ name: "holos", isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
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

    render(
      <UpdateVolumeFormDialog
        defaultValues={{ name: "holos", isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
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

    render(
      <UpdateVolumeFormDialog
        defaultValues={{ name: "holos", isPublic: true }}
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "update");
    await userEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });
});
