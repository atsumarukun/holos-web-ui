import { IconLabel } from "@/components/atoms/IconLabel";
import { render } from "@testing-library/react";
import { FaBeer } from "react-icons/fa";

describe("IconLabel", () => {
  it("Check rendering", () => {
    render(<IconLabel htmlFor="test-input" icon={FaBeer} />);

    const label = document.querySelector("label");
    expect(label?.querySelector("svg")).toBeInTheDocument();
  });

  it("Check className", () => {
    render(
      <IconLabel htmlFor="test-input" className="custom-class" icon={FaBeer} />
    );

    const label = document.querySelector("label");
    expect(label).toHaveClass("text-xl", "custom-class");
  });
});
