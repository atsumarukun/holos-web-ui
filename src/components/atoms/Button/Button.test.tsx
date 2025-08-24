import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { LuSettings } from "react-icons/lu";

describe("Button", () => {
  it("renders", () => {
    render(<Button label="label" />);
    expect(screen.getByText("label")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(<Button label="icon" icon={LuSettings} />);
    expect(screen.getByText("icon")).toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { rerender } = render(<Button label="default" />);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");

    rerender(<Button label="outline" variant="outline" />);
    expect(screen.getByRole("button")).toHaveClass("border");

    rerender(<Button label="ghost" variant="ghost" />);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-accent");
  });

  it("fires onClick event", () => {
    const handleClick = jest.fn();
    render(<Button label="click" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("merges className correctly", () => {
    render(<Button label="class" className="custom-class" />);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });
});
