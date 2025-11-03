import { render, screen } from "@testing-library/react";
import { SignupTemplate } from "./SignupTemplate";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("Auth/Templates/SignupTemplate", () => {
  it("renders", () => {
    const { container } = render(<SignupTemplate />);
    expect(screen.getByRole("paragraph")).toHaveTextContent("Holos");
    expect(screen.getByRole("heading")).toHaveTextContent("アカウント作成");
    expect(container.querySelector("form")).toBeInTheDocument();
  });
});
