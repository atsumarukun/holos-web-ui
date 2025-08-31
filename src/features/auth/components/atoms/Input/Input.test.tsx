import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Atoms/AuthInput", () => {
  it("renders", () => {
    render(<Input id="username" placeholder="username" />);
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { rerender } = render(
      <Input id="username" placeholder="username" variant="default" />
    );
    expect(screen.getByPlaceholderText("username")).toHaveClass(
      "placeholder-gray-400"
    );

    rerender(
      <Input id="username" placeholder="username" variant="destructive" />
    );
    expect(screen.getByPlaceholderText("username")).toHaveClass(
      "placeholder-destructive/50"
    );
  });

  it("fires onChange event", () => {
    render(<Input id="username" placeholder="username" />);
    const input: HTMLInputElement = screen.getByPlaceholderText("username");

    fireEvent.change(input, { target: { value: "holos" } });
    expect(input.value).toBe("holos");
  });
});
