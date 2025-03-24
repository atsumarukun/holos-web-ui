import { IconButton } from "@components/atoms/IconButton";
import { fireEvent, render } from "@testing-library/react";
import { LuMoon } from "react-icons/lu";

describe("IconButton", () => {
  it("Check rendering", () => {
    const { getByRole } = render(
      <IconButton icon={LuMoon} onClick={() => {}} />
    );

    expect(getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("Check if onClick is called", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <IconButton icon={LuMoon} onClick={handleClick} />
    );

    const button = getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Check if className is reflected", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <IconButton icon={LuMoon} onClick={handleClick} className="test-class" />
    );

    const button = getByRole("button");
    expect(button).toHaveClass("test-class");
  });
});
