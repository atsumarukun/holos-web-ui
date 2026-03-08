import { render, screen, waitFor } from "@testing-library/react";
import { DeleteVolumesConfirmDialog } from "./DeleteVolumesConfirmDialog";
import userEvent from "@testing-library/user-event";
import { refetchContext } from "@/providers/refetch";
import { ReactNode } from "react";

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

describe("Storage/Organisms/DeleteVolumesConfirmDialog", () => {
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
      <DeleteVolumesConfirmDialog
        names={["holos", "test"]}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.getByText("ボリューム削除")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) =>
          content.includes("選択したボリュームを削除しますか？") &&
          content.includes("削除したボリュームは復元できません."),
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "削除" })).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    renderWithContext(
      <DeleteVolumesConfirmDialog
        names={["holos", "test"]}
        open={false}
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.queryByText("ボリューム削除")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        (content) =>
          content.includes("選択したボリュームを削除しますか？") &&
          content.includes("削除したボリュームは復元できません."),
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "削除" }),
    ).not.toBeInTheDocument();
  });

  it("invokes the success handler when delete succeeds", async () => {
    deleteVolumesMock.mockResolvedValue({
      holos: { success: true },
      test: { success: true },
    });

    renderWithContext(
      <DeleteVolumesConfirmDialog
        names={["holos", "test"]}
        open={true}
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(successToastMock).toHaveBeenCalled();
      expect(refetchMock).toHaveBeenCalled();
      expect(onOpenChangeMock).toHaveBeenCalled();
    });
  });

  it("shows error toast when delete fails with error message", async () => {
    deleteVolumesMock.mockResolvedValue({
      holos: {
        success: false,
        error: "空ではないボリュームは削除できません.",
      },
      test: { success: true },
    });

    renderWithContext(
      <DeleteVolumesConfirmDialog
        names={["holos", "test"]}
        open={true}
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalledWith(
        "「holos」の削除に失敗しました.\n空ではないボリュームは削除できません.",
      );
    });
  });

  it("shows error toast when delete fails without error message", async () => {
    deleteVolumesMock.mockResolvedValue({
      holos: { success: false },
      test: { success: false },
    });

    renderWithContext(
      <DeleteVolumesConfirmDialog
        names={["holos", "test"]}
        open={true}
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalledTimes(2);
    });
  });
});
