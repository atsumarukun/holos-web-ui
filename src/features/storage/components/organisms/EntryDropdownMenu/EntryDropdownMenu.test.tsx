import { render, screen } from "@testing-library/react";
import { EntryDropdownMenu } from "./EntryDropdownMenu";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: () => jest.fn(),
}));

describe("Storage/Organisms/EntryDropdownMenu", () => {
  it("renders", () => {
    render(
      <EntryDropdownMenu
        volumeName="volume"
        currentKey="key"
        entry={{
          key: "key/update.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />,
    );
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders dropdown menu items when opened", async () => {
    render(
      <EntryDropdownMenu
        volumeName="volume"
        currentKey="key"
        entry={{
          key: "key/update.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("opens update dialog when edit is clicked", async () => {
    render(
      <EntryDropdownMenu
        volumeName="volume"
        currentKey="key"
        entry={{
          key: "key/update.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("編集"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("「update.txt」を編集")).toBeInTheDocument();
  });

  it("opens copy dialog when copy is clicked", async () => {
    render(
      <EntryDropdownMenu
        volumeName="volume"
        currentKey="key"
        entry={{
          key: "key/update.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("コピー"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("エントリーコピー")).toBeInTheDocument();
  });

  it("opens move dialog when move is clicked", async () => {
    render(
      <EntryDropdownMenu
        volumeName="volume"
        currentKey="key"
        entry={{
          key: "key/update.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("移動"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("エントリー移動")).toBeInTheDocument();
  });

  it("opens delete dialog when delete is clicked", async () => {
    render(
      <EntryDropdownMenu
        volumeName="volume"
        currentKey="key"
        entry={{
          key: "key/update.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("削除"));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("エントリー削除")).toBeInTheDocument();
  });
});
