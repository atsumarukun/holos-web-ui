import { render, screen } from "@testing-library/react";
import { InputField } from "./InputField";

const mockRegisterReturn = {
  name: "mock",
  onChange: () => Promise.resolve(),
  onBlur: () => Promise.resolve(),
  ref: () => {},
};

describe("Common/Molecules/InputField", () => {
  it("renders", () => {
    render(
      <InputField
        id="username"
        label="ユーザー名"
        registerReturn={mockRegisterReturn}
        isRequired
      />
    );
    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    expect(screen.getByText("必須")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with error", () => {
    render(
      <InputField
        id="username"
        label="ユーザー名"
        error="user name is required."
        registerReturn={mockRegisterReturn}
      />
    );
    expect(screen.getByText("user name is required.")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("bg-destructive/10");
  });
});
