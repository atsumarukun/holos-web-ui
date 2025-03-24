import { ThemeToggle } from "@components/molecules/ThemeToggle";
import { fireEvent, render } from "@testing-library/react";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeToggle", () => {
  it("Check rendering", () => {
    useTheme.mockReturnValue({ theme: "dark", setTheme: jest.fn() });

    const { getByRole } = render(<ThemeToggle />);

    expect(getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("Check if it switches to light mode", async () => {
    const setThemeMock = jest.fn();
    useTheme.mockReturnValue({ theme: "dark", setTheme: setThemeMock });
    const { getByRole } = render(<ThemeToggle />);

    const button = getByRole("button");
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("Check if it switches to dark mode", async () => {
    const setThemeMock = jest.fn();
    useTheme.mockReturnValue({ theme: "light", setTheme: setThemeMock });
    const { getByRole } = render(<ThemeToggle />);

    const button = getByRole("button");
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });
});
