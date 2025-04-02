import { InputField } from "@/components/templates/Form";
import { render } from "@testing-library/react";

describe("InputField", () => {
  it("Check rendering", () => {
    const { container } = render(
      <InputField>
        <input />
      </InputField>
    );

    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("Check if className is reflected", () => {
    const { container } = render(
      <InputField className="test-class">
        <input />
      </InputField>
    );

    expect(container.firstChild).toHaveClass("test-class");
  });

  it("Check rendering of child elements", () => {
    const { getByRole } = render(
      <InputField>
        <input />
      </InputField>
    );

    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
