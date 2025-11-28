import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { userEvent } from "storybook/internal/test";

describe("Common/Atoms/Input", () => {
  it("renders", () => {
    render(<Input id="name" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { rerender } = render(<Input id="name" variant="default" />);
    expect(screen.getByRole("textbox")).toHaveClass("bg-inherit");

    rerender(<Input id="name" variant="destructive" />);
    expect(screen.getByRole("textbox")).toHaveClass("bg-destructive/10");
  });

  it("renders with placeholder", () => {
    render(<Input id="name" placeholder="name" />);
    expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
  });

  it("fires onChange event", async () => {
    render(<Input id="name" />);
    const input: HTMLInputElement = screen.getByRole("textbox");

    await userEvent.type(input, "holos");
    expect(input.value).toBe("holos");
  });
});
