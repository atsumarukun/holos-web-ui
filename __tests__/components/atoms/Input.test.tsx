import { Input } from "@/components/atoms/Input";
import { fireEvent, render } from "@testing-library/react";
import { useForm } from "react-hook-form";

jest.mock("react-hook-form", () => ({
  useForm: jest.fn().mockReturnValue({
    register: jest.fn().mockReturnValue({
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
      name: "test-input",
    }),
  }),
}));

describe("Input", () => {
  it("Check rendering", () => {
    const { getByRole } = render(
      <Input
        id="test-input"
        placeholder="test-input"
        {...useForm().register("test-input")}
      />
    );

    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("Check if id is reflected", () => {
    const { getByRole } = render(
      <Input
        id="test-input"
        placeholder="test-input"
        {...useForm().register("test-input")}
      />
    );

    expect(getByRole("textbox")).toHaveAttribute("id", "test-input");
  });

  it("Check if placeholder is reflected", () => {
    const { getByRole } = render(
      <Input
        id="test-input"
        placeholder="test-input"
        {...useForm().register("test-input")}
      />
    );

    expect(getByRole("textbox")).toHaveAttribute("placeholder", "test-input");
  });

  it("Check if className is reflected", () => {
    const { getByRole } = render(
      <Input
        id="test-input"
        placeholder="test-input"
        className="test-class"
        {...useForm().register("test-input")}
      />
    );

    expect(getByRole("textbox")).toHaveClass("test-class");
  });

  it("Check for value changes", () => {
    const { getByRole } = render(
      <Input
        id="test-input"
        placeholder="test-input"
        {...useForm().register("test-input")}
      />
    );

    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(input).toHaveValue("test");
  });
});
