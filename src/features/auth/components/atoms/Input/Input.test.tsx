import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";
import { LuUserRound } from "react-icons/lu";

describe("Atoms/AuthInput", () => {
  it("renders", () => {
    const { container } = render(
      <Input id="username" placeholder="username" icon={LuUserRound} />
    );
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    expect(
      container.querySelector("label")?.querySelector("svg")
    ).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { rerender, container } = render(
      <Input
        id="username"
        placeholder="username"
        icon={LuUserRound}
        variant="default"
      />
    );
    expect(container.firstChild).toHaveClass("border-border");

    rerender(
      <Input
        id="username"
        placeholder="username"
        icon={LuUserRound}
        variant="destructive"
      />
    );
    expect(container.firstChild).toHaveClass("border-destructive");
  });

  it("fires onChange event", () => {
    render(<Input id="username" placeholder="username" icon={LuUserRound} />);
    const input: HTMLInputElement = screen.getByPlaceholderText("username");

    fireEvent.change(input, { target: { value: "holos" } });
    expect(input.value).toBe("holos");
  });
});
