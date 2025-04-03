import { SignupView } from "@/features/auth/components/views/SignupView";
import { render } from "@testing-library/react";

describe("SignupView", () => {
  it("Check rendering", () => {
    const { container, getByRole } = render(<SignupView />);

    expect(container.querySelector("p")).toBeInTheDocument();
    expect(
      getByRole("heading", { name: "アカウント作成" })
    ).toBeInTheDocument();
    expect(container.querySelector("form")).toBeInTheDocument();
  });
});
