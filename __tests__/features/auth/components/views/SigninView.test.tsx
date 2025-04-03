import { SigninView } from "@/features/auth/components/views/SigninView";
import { render } from "@testing-library/react";

describe("SigninView", () => {
  it("Check rendering", () => {
    const { container, getByRole } = render(<SigninView />);

    expect(container.querySelector("p")).toBeInTheDocument();
    expect(getByRole("heading", { name: "ログイン" })).toBeInTheDocument();
    expect(container.querySelector("form")).toBeInTheDocument();
  });
});
