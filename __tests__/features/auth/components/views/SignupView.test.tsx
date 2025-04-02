import { SignupView } from "@/features/auth/components/views/SignupView";
import { render } from "@testing-library/react";

describe("SignupView", () => {
  it("Check rendering", () => {
    const { container, getByText } = render(<SignupView />);

    expect(container.querySelector("p")).toBeInTheDocument();
    expect(getByText("アカウント作成")).toBeInTheDocument();
    expect(container.querySelector("form")).toBeInTheDocument();
  });
});
