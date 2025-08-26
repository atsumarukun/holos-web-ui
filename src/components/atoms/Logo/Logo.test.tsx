import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";
import { Size, sizes } from "./styles";

describe("Logo", () => {
  it("renders", () => {
    render(<Logo />);
    expect(screen.getByAltText("ロゴ")).toBeInTheDocument();
    expect(screen.getByRole("paragraph")).toHaveTextContent("Holos");
    expect(screen.getByRole("paragraph")).toHaveClass(sizes.base.label);
  });

  it("renders without icon", () => {
    render(<Logo noIcon />);
    expect(screen.queryByAltText("ロゴ")).not.toBeInTheDocument();
    expect(screen.getByRole("paragraph")).toHaveTextContent("Holos");
  });

  it.each(Object.keys(sizes) as Array<Size>)("applies size: %s", (size) => {
    render(<Logo size={size} />);
    expect(screen.getByAltText("ロゴ")).toHaveAttribute(
      "width",
      sizes[size].image.toString()
    );
    expect(screen.getByAltText("ロゴ")).toHaveAttribute(
      "height",
      sizes[size].image.toString()
    );
    expect(screen.getByRole("paragraph")).toHaveClass(sizes[size].label);
  });
});
