import { render, screen, waitFor } from "@testing-library/react";
import { DeleteVolumeConfirmDialog } from "./DeleteVolumeConfirmDialog";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { refetchContext } from "@/providers/refetch";
import { errorCode } from "@/lib/errors";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

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
      <DeleteVolumeConfirmDialog
        name="holos"
        open
        onOpenChange={onOpenChangeMock}
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
    renderWithContext(
      <DeleteVolumeConfirmDialog
        name="holos"
        open={false}
        onOpenChange={onOpenChangeMock}
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
        error: undefined,
      },
    });

    renderWithContext(
      <DeleteVolumeConfirmDialog
        name="holos"
        open
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
        error: {
          code: errorCode.ConstraintViolation,
          message: "volume cannot be deleted because it contains entries",
        },
      },
    });

    renderWithContext(
      <DeleteVolumeConfirmDialog
        name="holos"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalledWith(
        "空ではないボリュームは削除できません.",
      );
    });
  });

  it("shows error toast when delete fails without error message", async () => {
    deleteVolumesMock.mockResolvedValue({
      holos: {
        error: {
          code: errorCode.InternalServerError,
          message: "internal server error",
        },
      },
    });

    renderWithContext(
      <DeleteVolumeConfirmDialog
        name="holos"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(errorToastMock).toHaveBeenCalled();
    });
  });

  it("redirect to signin page when unauthenticated", async () => {
    deleteVolumesMock.mockResolvedValue({
      holos: {
        error: {
          code: errorCode.Unauthenticated,
          message: "unauthenticated",
        },
      },
    });

    renderWithContext(
      <DeleteVolumeConfirmDialog
        name="holos"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("redirect to signin page when unauthorized", async () => {
    deleteVolumesMock.mockResolvedValue({
      holos: {
        error: {
          code: errorCode.Unauthorized,
          message: "unauthorized",
        },
      },
    });

    renderWithContext(
      <DeleteVolumeConfirmDialog
        name="holos"
        open
        onOpenChange={onOpenChangeMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/signin");
    });
  });
});
