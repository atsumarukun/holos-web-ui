import { IconLabel } from "@/components/atoms/IconLabel";
import { render } from "@testing-library/react";
import { FaBeer } from "react-icons/fa";

describe("IconLabel", () => {
  it("Check rendering", () => {
    const { container } = render(
      <IconLabel htmlFor="test-input" icon={FaBeer} />
    );

    expect(
      container.querySelector("label")?.querySelector("svg")
    ).toBeInTheDocument();
  });

  it("Check if className is reflected", () => {
    const { container } = render(
      <IconLabel htmlFor="test-input" className="test-class" icon={FaBeer} />
    );

    expect(container.querySelector("label")).toHaveClass("test-class");
  });
});
