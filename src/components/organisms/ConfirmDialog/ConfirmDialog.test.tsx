import { render, screen, waitFor } from "@testing-library/react";
import { ConfirmDialog } from "./ConfirmDialog";
import userEvent from "@testing-library/user-event";

const onOpenChangeMock = jest.fn();
const onApproveMock = jest.fn();

describe("Common/Organisms/ConfirmDialog", () => {
  it("renders", () => {
    render(
      <ConfirmDialog
        title="アカウント削除"
        description="アカウントを削除しますか？\n削除したアカウントは復元できません."
        approveLabel="削除"
        open
        onOpenChange={onOpenChangeMock}
        onApprove={onApproveMock}
      />,
    );
    expect(screen.getByText("アカウント削除")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) =>
          content.includes("アカウントを削除しますか？") &&
          content.includes("削除したアカウントは復元できません."),
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "削除" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "キャンセル" }),
    ).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <ConfirmDialog
        title="アカウント削除"
        description="アカウントを削除しますか？\n削除したアカウントは復元できません."
        approveLabel="削除"
        open={false}
        onOpenChange={onOpenChangeMock}
        onApprove={onApproveMock}
      />,
    );
    expect(screen.queryByText("アカウント削除")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        (content) =>
          content.includes("アカウントを削除しますか？") &&
          content.includes("削除したアカウントは復元できません."),
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "削除" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "キャンセル" }),
    ).not.toBeInTheDocument();
  });

  it("calls onOpenChange when the cancel button is clicked", async () => {
    render(
      <ConfirmDialog
        title="アカウント削除"
        description="アカウントを削除しますか？\n削除したアカウントは復元できません."
        approveLabel="削除"
        open
        onOpenChange={onOpenChangeMock}
        onApprove={onApproveMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "キャンセル" }));

    await waitFor(() => {
      expect(onOpenChangeMock).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onApprove when the approve button is clicked", async () => {
    render(
      <ConfirmDialog
        title="アカウント削除"
        description="アカウントを削除しますか？\n削除したアカウントは復元できません."
        approveLabel="削除"
        open
        onOpenChange={onOpenChangeMock}
        onApprove={onApproveMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(onApproveMock).toHaveBeenCalledTimes(1);
    });
  });
});
