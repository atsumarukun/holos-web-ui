import { render, screen } from "@testing-library/react";
import { SelectedEntriesDropdownMenu } from "./SelectedEntriesDropdownMenu";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: () => jest.fn(),
}));

describe("Storage/Organisms/SelectedEntriesDropdownMenu", () => {
  it("renders", () => {
    render(
      <SelectedEntriesDropdownMenu
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
      />,
    );
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders dropdown menu items when opened", async () => {
    render(
      <SelectedEntriesDropdownMenu
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("shows selected count and enables action when items are selected", async () => {
    render(
      <SelectedEntriesDropdownMenu
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("件選択中")).toBeInTheDocument();
    expect(screen.getByText("コピー")).not.toHaveAttribute("data-disabled");
    expect(screen.getByText("移動")).not.toHaveAttribute("data-disabled");
    expect(screen.getByText("削除")).not.toHaveAttribute("data-disabled");
  });

  it("shows selected count and disables action when no items are selected", async () => {
    render(
      <SelectedEntriesDropdownMenu
        volumeName="volume"
        currentKey="key"
        entryKeys={[]}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("件選択中")).toBeInTheDocument();
    expect(screen.getByText("コピー")).toHaveAttribute("data-disabled");
    expect(screen.getByText("移動")).toHaveAttribute("data-disabled");
    expect(screen.getByText("削除")).toHaveAttribute("data-disabled");
  });

  it("opens copy dialog when copy is clicked", async () => {
    render(
      <SelectedEntriesDropdownMenu
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("コピー"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("エントリーコピー")).toBeInTheDocument();
  });

  it("opens move dialog when move is clicked", async () => {
    render(
      <SelectedEntriesDropdownMenu
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("移動"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("エントリー移動")).toBeInTheDocument();
  });

  it("opens delete dialog when delete is clicked", async () => {
    render(
      <SelectedEntriesDropdownMenu
        volumeName="volume"
        currentKey="key"
        entryKeys={["key/sample.txt"]}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("削除"));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("エントリー削除")).toBeInTheDocument();
  });
});
