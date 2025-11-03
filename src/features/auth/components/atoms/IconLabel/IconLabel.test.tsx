import { render } from "@testing-library/react";
import { IconLabel } from ".";
import { LuUserRound } from "react-icons/lu";

describe("Auth/Atoms/IconLabel", () => {
  it("renders", () => {
    const { container } = render(
      <IconLabel htmlFor="username" icon={LuUserRound} />
    );
    expect(
      container.querySelector("label")?.querySelector("svg")
    ).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { rerender, container } = render(
      <IconLabel htmlFor="username" icon={LuUserRound} variant="default" />
    );
    expect(container.querySelector("label")).toHaveClass("text-foreground");

    rerender(
      <IconLabel htmlFor="username" icon={LuUserRound} variant="destructive" />
    );
    expect(container.querySelector("label")).toHaveClass("text-destructive");
  });
});
