import { FormField } from "@/components/templates/Form";
import { render } from "@testing-library/react";

describe("FormField", () => {
  it("Check rendering", () => {
    const { container } = render(
      <FormField>
        <input />
      </FormField>
    );

    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("Check if className is reflected", () => {
    const { container } = render(
      <FormField className="test-class">
        <input />
      </FormField>
    );

    expect(container.firstChild).toHaveClass("test-class");
  });

  it("Check rendering of child elements", () => {
    const { getByRole } = render(
      <FormField>
        <input />
      </FormField>
    );

    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
