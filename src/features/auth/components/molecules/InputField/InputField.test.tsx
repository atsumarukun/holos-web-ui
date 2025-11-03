import { render, screen } from "@testing-library/react";
import { InputField } from "./InputField";
import { LuUserRound } from "react-icons/lu";

const mockRegisterReturn = {
  name: "mock",
  onChange: () => Promise.resolve(),
  onBlur: () => Promise.resolve(),
  ref: () => {},
};

describe("Auth/Molecules/InputField", () => {
  it("renders", () => {
    const { container } = render(
      <InputField
        id="username"
        placeholder="username"
        type="text"
        icon={LuUserRound}
        registerReturn={mockRegisterReturn}
      />
    );
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("username")).toHaveAttribute(
      "type",
      "text"
    );
    expect(
      container.querySelector("label")?.querySelector("svg")
    ).toBeInTheDocument();
  });

  it("renders with error", () => {
    const { container } = render(
      <InputField
        id="username"
        placeholder="username"
        type="text"
        error="user name is required."
        icon={LuUserRound}
        registerReturn={mockRegisterReturn}
      />
    );
    expect(screen.getByText("user name is required.")).toBeInTheDocument();
    expect(container.firstChild?.firstChild).toHaveClass("border-destructive");
    expect(screen.getByPlaceholderText("username")).toHaveClass(
      "placeholder-destructive/50"
    );
    expect(container.querySelector("label")).toHaveClass("text-destructive");
  });
});
