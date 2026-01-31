import { render, screen, waitFor } from "@testing-library/react";
import { DeleteVolumeConfirmDialog } from "./DeleteVolumeConfirmDialog";
import userEvent from "@testing-library/user-event";

const successToastMock = jest.fn();
const errorToastMock = jest.fn();
jest.mock("@/lib/toast", () => ({
  successToast: () => successToastMock(),
  errorToast: (description?: string) => errorToastMock(description),
}));

const deleteVolumesMock = jest.fn();
jest.mock("@/features/storage/actions/delete-volumes", () => ({
  deleteVolumes: () => deleteVolumesMock(),
}));

const onOpenChangeMock = jest.fn();
const refetchMock = jest.fn();

describe("Storage/Organisms/DeleteVolumeConfirmDialog", () => {
  it("renders", () => {
    render(
      <DeleteVolumeConfirmDialog
        name="holos"
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );
    expect(screen.getByText("ボリューム削除")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) =>
          content.includes("「holos」を削除しますか？") &&
          content.includes("削除したボリュームは復元できません."),
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "削除" })).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <DeleteVolumeConfirmDialog
        name="holos"
        open={false}
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );
    expect(screen.queryByText("ボリューム削除")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        (content) =>
          content.includes("「holos」を削除しますか？") &&
          content.includes("削除したボリュームは復元できません."),
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "削除" }),
    ).not.toBeInTheDocument();
  });

  it("invokes the success handler when delete succeeds", async () => {
    deleteVolumesMock.mockResolvedValue({
      holos: {
        success: true,
      },
    });

    render(
      <DeleteVolumeConfirmDialog
        name="holos"
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalled();
      expect(refetchMock).toHaveBeenCalled();
      expect(onOpenChangeMock).toHaveBeenCalled();
    });
  });

  it("shows error toast when update fails with error message", async () => {
    deleteVolumesMock.mockResolvedValue({
      holos: {
        success: false,
        error: "空ではないボリュームは削除できません.",
      },
    });

    render(
      <DeleteVolumeConfirmDialog
        name="holos"
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalledWith(
        "空ではないボリュームは削除できません.",
      );
    });
  });

  it("shows error toast when update fails without error message", async () => {
    deleteVolumesMock.mockResolvedValue({
      holos: {
        success: false,
      },
    });

    render(
      <DeleteVolumeConfirmDialog
        name="holos"
        open
        onOpenChange={onOpenChangeMock}
        refetch={refetchMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });
});
