import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { IconButton } from "./IconButton";
import { LuSettings } from "react-icons/lu";

describe("Common/Atoms/IconButton", () => {
  it("renders", () => {
    render(<IconButton icon={LuSettings} />);
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { rerender } = render(<IconButton icon={LuSettings} />);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");

    rerender(<IconButton icon={LuSettings} variant="outline" />);
    expect(screen.getByRole("button")).toHaveClass("border");

    rerender(<IconButton icon={LuSettings} variant="ghost" />);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-accent");
  });

  it("fires onClick event", async () => {
    const handleClick = jest.fn();
    render(<IconButton icon={LuSettings} onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("merges className correctly", () => {
    render(<IconButton icon={LuSettings} className="custom-class" />);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });
});
