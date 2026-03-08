import { render, screen } from "@testing-library/react";
import { SelectedVolumesDropdownMenu } from "./SelectedVolumesDropdownMenu";
import userEvent from "@testing-library/user-event";

describe("Storage/Organisms/SelectedVolumesDropdownMenu", () => {
  it("renders", () => {
    render(<SelectedVolumesDropdownMenu volumes={["holos"]} />);
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders dropdown menu items when opened", async () => {
    render(<SelectedVolumesDropdownMenu volumes={["holos"]} />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("shows selected count and enables delete when items are selected", async () => {
    render(<SelectedVolumesDropdownMenu volumes={["holos", "test"]} />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("件選択中")).toBeInTheDocument();
    expect(screen.getByText("削除")).not.toHaveAttribute("data-disabled");
  });

  it("shows selected count and disables delete when no items are selected", async () => {
    render(<SelectedVolumesDropdownMenu volumes={[]} />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("件選択中")).toBeInTheDocument();
    expect(screen.getByText("削除")).toHaveAttribute("data-disabled");
  });

  it("opens delete dialog when delete is clicked", async () => {
    render(<SelectedVolumesDropdownMenu volumes={["holos", "test"]} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("削除"));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});
