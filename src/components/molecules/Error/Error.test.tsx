import { render, screen } from "@testing-library/react";
import { Error } from "./Error";
import { FiAlertTriangle } from "react-icons/fi";

describe("Common/Molecules/Error", () => {
  it("renders", () => {
    render(<Error title="エラーが発生しました" />);
    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(
      <Error
        title="エラーが発生しました"
        description="データの取得に失敗しました."
      />
    );
    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
    expect(screen.getByText("データの取得に失敗しました.")).toBeInTheDocument();
  });

  it("renders with specified icon", () => {
    const { container } = render(
      <Error title="エラーが発生しました" icon={FiAlertTriangle} />
    );
    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("merges className correctly", () => {
    const { container } = render(
      <Error title="エラーが発生しました" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
