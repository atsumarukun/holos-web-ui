import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { FormDialog } from "./FormDialog";

const onOpenChangeMock = jest.fn();
const onSubmitMock = jest.fn();

describe("Common/Organisms/FormDialog", () => {
  it("renders", () => {
    render(
      <FormDialog
        title="アカウント作成"
        submitLabel="作成"
        open
        onOpenChange={onOpenChangeMock}
        onSubmit={onSubmitMock}
      >
        <input />
      </FormDialog>
    );
    expect(screen.getByText("アカウント作成")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <FormDialog
        title="アカウント作成"
        submitLabel="作成"
        open={false}
        onOpenChange={onOpenChangeMock}
        onSubmit={onSubmitMock}
      >
        <input />
      </FormDialog>
    );
    expect(screen.queryByText("アカウント作成")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "作成" })
    ).not.toBeInTheDocument();
  });

  it("calls onOpenChange when the cancel button is clicked", async () => {
    render(
      <FormDialog
        title="アカウント作成"
        submitLabel="作成"
        open
        onOpenChange={onOpenChangeMock}
        onSubmit={onSubmitMock}
      >
        <input />
      </FormDialog>
    );

    await userEvent.click(screen.getByRole("button", { name: "キャンセル" }));

    await waitFor(() => {
      expect(onOpenChangeMock).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onSubmit when the submit button is clicked", async () => {
    render(
      <FormDialog
        title="アカウント作成"
        submitLabel="作成"
        open
        onOpenChange={onOpenChangeMock}
        onSubmit={onSubmitMock}
      >
        <input />
      </FormDialog>
    );

    await userEvent.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
  });
});
