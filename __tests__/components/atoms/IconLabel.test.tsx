import { IconLabel } from "@/components/atoms/IconLabel";
import { render } from "@testing-library/react";
import { FaBeer } from "react-icons/fa";

describe("IconLabel", () => {
  it("Check rendering", () => {
    render(<IconLabel htmlFor="test-input" icon={FaBeer} />);

    expect(
      document.querySelector("label")?.querySelector("svg")
    ).toBeInTheDocument();
  });

  it("Check if className is reflected", () => {
    render(
      <IconLabel htmlFor="test-input" className="test-class" icon={FaBeer} />
    );

    expect(document.querySelector("label")).toHaveClass("test-class");
  });
});
