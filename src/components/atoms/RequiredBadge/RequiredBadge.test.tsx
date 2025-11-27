import { render, screen } from "@testing-library/react";
import { RequiredBadge } from ".";

describe("Common/Atoms/RequiredBadge", () => {
  it("renders", () => {
    render(<RequiredBadge />);
    expect(screen.getByText("必須")).toBeInTheDocument();
  });
});
