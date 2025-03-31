import { Logo } from "@/components/atoms/Logo";
import { render } from "@testing-library/react";

describe("IconButton", () => {
  it("Check rendering", () => {
    const { getByRole } = render(<Logo />);

    expect(getByRole("paragraph")).toBeInTheDocument();
  });

  it("Check contents of the display", () => {
    const { getByRole } = render(<Logo />);

    expect(getByRole("paragraph")).toHaveTextContent("Holos");
  });

  it("Check default textSize", () => {
    const { getByRole } = render(<Logo />);

    expect(getByRole("paragraph")).toHaveClass("text-3xl");
  });

  it("Check if fontSize is reflected", () => {
    const { getByRole } = render(<Logo textSize="text-2xl" />);

    expect(getByRole("paragraph")).toHaveClass("text-2xl");
  });

  it("Check if accent color is reflected", () => {
    const { getByRole } = render(<Logo />);

    expect(getByRole("paragraph").querySelector("span")).toHaveClass(
      "text-theme"
    );
  });
});
