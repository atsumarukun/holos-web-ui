import { SubmitButton } from "@/components/templates/Form";
import { fireEvent, render } from "@testing-library/react";

describe("SubmitButton", () => {
  it("Check rendering", () => {
    const { getByRole } = render(<SubmitButton>test</SubmitButton>);

    expect(getByRole("button")).toBeInTheDocument();
  });

  it("Check if className is reflected", () => {
    const { getByRole } = render(
      <SubmitButton className="test-class">test</SubmitButton>
    );

    expect(getByRole("button")).toHaveClass("test-class");
  });

  it("Check rendering of child elements", () => {
    const { getByText } = render(<SubmitButton>test</SubmitButton>);

    expect(getByText("test")).toBeInTheDocument();
  });

  it("Check if type is submit", () => {
    const { getByRole } = render(<SubmitButton>test</SubmitButton>);

    expect(getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("Check if form is submitted when clicked", () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    const { getByRole } = render(
      <form onSubmit={handleSubmit}>
        <SubmitButton>test</SubmitButton>
      </form>
    );

    const button = getByRole("button");
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
