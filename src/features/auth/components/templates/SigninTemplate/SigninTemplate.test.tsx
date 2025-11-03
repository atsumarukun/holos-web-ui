import { render, screen } from "@testing-library/react";
import { SigninTemplate } from "./SigninTemplate";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("Auth/Templates/SigninTemplate", () => {
  it("renders", () => {
    const { container } = render(<SigninTemplate />);
    expect(screen.getByRole("paragraph")).toHaveTextContent("Holos");
    expect(screen.getByRole("heading")).toHaveTextContent("ログイン");
    expect(container.querySelector("form")).toBeInTheDocument();
  });
});
