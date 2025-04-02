import { Form } from "@/components/templates/Form";
import { fireEvent, render } from "@testing-library/react";

describe("Form", () => {
  it("Check rendering", () => {
    render(
      <Form onSubmit={jest.fn()}>
        <input />
      </Form>
    );

    expect(document.querySelector("form")).toBeInTheDocument();
  });

  it("Check if className is reflected", () => {
    render(
      <Form onSubmit={jest.fn()} className="test-class">
        <input />
      </Form>
    );

    expect(document.querySelector("form")).toHaveClass("test-class");
  });

  it("Check if onSubmit is called", () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <input />
      </Form>
    );

    const form = document.querySelector("form");
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
