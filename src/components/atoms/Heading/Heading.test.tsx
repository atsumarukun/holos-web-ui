import { render, screen } from "@testing-library/react";
import { Heading } from "./Heading";

describe("Common/Atoms/Heading", () => {
  it("renders", () => {
    render(<Heading text="ホーム" />);
    expect(screen.getByText("ホーム")).toBeInTheDocument();
  });

  it("merges className correctly", () => {
    render(<Heading text="ホーム" className="custom-class" />);
    expect(screen.getByText("ホーム")).toHaveClass("custom-class");
  });
});
