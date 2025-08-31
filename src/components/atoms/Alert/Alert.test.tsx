import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Atoms/Alert", () => {
  it("renders", () => {
    render(<Alert text="alert" />);
    expect(screen.getByText("alert")).toBeInTheDocument();
  });
});
