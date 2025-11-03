import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Input } from "./Input";

describe("Auth/Atoms/Input", () => {
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

  it("fires onChange event", async () => {
    render(<Input id="username" placeholder="username" />);
    const input: HTMLInputElement = screen.getByPlaceholderText("username");

    await userEvent.type(input, "holos");
    expect(input.value).toBe("holos");
  });
});
