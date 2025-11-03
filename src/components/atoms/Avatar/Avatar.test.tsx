import { render, screen } from "@testing-library/react";
import { Avatar } from ".";

describe("Common/Atoms/Avatar", () => {
  it("renders", () => {
    render(<Avatar accountName="sample" />);
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("merges className correctly", () => {
    const { container } = render(
      <Avatar accountName="sample" className="text-black" />
    );
    expect(container.firstChild).toHaveClass("text-black");
  });
});
