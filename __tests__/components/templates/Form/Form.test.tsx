import { Form } from "@/components/templates/Form";
import { fireEvent, render } from "@testing-library/react";

describe("Form", () => {
  it("Check rendering", () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <input />
      </Form>
    );

    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("Check if className is reflected", () => {
    const { container } = render(
      <Form onSubmit={jest.fn()} className="test-class">
        <input />
      </Form>
    );

    expect(container.querySelector("form")).toHaveClass("test-class");
  });

  it("Check if onSubmit is called", () => {
    const handleSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={handleSubmit}>
        <input />
      </Form>
    );

    const form = container.querySelector("form");
    fireEvent.submit(form!);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("Check rendering of child elements", () => {
    const { getByRole } = render(
      <Form onSubmit={jest.fn()}>
        <input />
      </Form>
    );

    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
