import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";
import { LogoSize, logoSizes } from "./styles";

describe("Logo", () => {
  it("renders", () => {
    render(<Logo />);
    expect(screen.getByAltText("ロゴ")).toBeInTheDocument();
    expect(screen.getByRole("paragraph")).toHaveTextContent("Holos");
    expect(screen.getByRole("paragraph")).toHaveClass(logoSizes.base.label);
  });

  it("renders without icon", () => {
    render(<Logo noIcon />);
    expect(screen.queryByAltText("ロゴ")).not.toBeInTheDocument();
    expect(screen.getByRole("paragraph")).toHaveTextContent("Holos");
  });

  it.each(Object.keys(logoSizes) as Array<LogoSize>)(
    "applies size: %s",
    (size) => {
      render(<Logo size={size} />);
      expect(screen.getByAltText("ロゴ")).toHaveAttribute(
        "width",
        logoSizes[size].image.toString()
      );
      expect(screen.getByAltText("ロゴ")).toHaveAttribute(
        "height",
        logoSizes[size].image.toString()
      );
      expect(screen.getByRole("paragraph")).toHaveClass(logoSizes[size].label);
    }
  );
});
