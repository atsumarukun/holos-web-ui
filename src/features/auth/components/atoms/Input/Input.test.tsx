import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Atoms/AuthInput", () => {
  it("renders", () => {
    const { container } = render(
      <Input id="username" placeholder="username" />
    );
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { rerender, container } = render(
      <Input id="username" placeholder="username" variant="default" />
    );
    expect(container.firstChild).toHaveClass("placeholder-gray-400");

    rerender(
      <Input id="username" placeholder="username" variant="destructive" />
    );
    expect(container.firstChild).toHaveClass("placeholder-destructive/50");
  });

  it("fires onChange event", () => {
    render(<Input id="username" placeholder="username" />);
    const input: HTMLInputElement = screen.getByPlaceholderText("username");

    fireEvent.change(input, { target: { value: "holos" } });
    expect(input.value).toBe("holos");
  });
});
