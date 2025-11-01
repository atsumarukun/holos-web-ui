import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { LuBot, LuHouse } from "react-icons/lu";
import { Menu } from "./Menu";

const pathnameMock = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => pathnameMock(),
}));

jest.mock("./constant", () => ({
  floors: [
    {
      key: "home",
      name: "ホーム",
      icon: LuHouse,
      path: "/",
    },
    {
      key: "permit",
      name: "アクセス許可",
      icon: LuBot,
      children: [
        { name: "エージェント", path: "/permit/agent" },
        { name: "ポリシー", path: "/permit/policy" },
      ],
    },
  ],
}));

describe("Organisms/Menu", () => {
  it("renders", () => {
    render(<Menu />);
    expect(screen.getByRole("link", { name: "ホーム" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "アクセス許可" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "ホーム" }).querySelector("svg")
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole("button", { name: "アクセス許可" })
        .querySelectorAll("svg").length
    ).toBe(2);
  });

  it("renders children when the accordion is open", async () => {
    render(<Menu />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "エージェント" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "ポリシー" })
      ).toBeInTheDocument();
    });
  });

  it("links matching the current path are highlighted", () => {
    pathnameMock.mockReturnValue("/");

    render(<Menu />);

    expect(screen.getByRole("link", { name: "ホーム" })).toHaveClass(
      "border-l-4"
    );
  });

  it("children matching the current path are highlighted", async () => {
    pathnameMock.mockReturnValue("/permit/agent");

    render(<Menu />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "エージェント" })).toHaveClass(
        "border-l-4"
      );
    });
  });
});
