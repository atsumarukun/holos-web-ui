import { render, screen, waitFor } from "@testing-library/react";
import { Breadcrumbs, breadcrumbContext } from "./provider";
import { Breadcrumb } from "./Breadcrumb";
import { userEvent } from "storybook/internal/test";

describe("Molecules/Breadcrumb", () => {
  const renderWithContext = (breadcrumbs: Breadcrumbs) => {
    render(
      <breadcrumbContext.Provider
        value={{ breadcrumbs, setBreadcrumbs: () => {} }}
      >
        <Breadcrumb />
      </breadcrumbContext.Provider>
    );
  };

  it("renders", () => {
    render(<Breadcrumb />);
    expect(
      screen.getByRole("link", { name: "" }).querySelector("svg")
    ).toBeInTheDocument();
  });

  it("renders with 3 or fewer breadcrumbs", () => {
    const breadcrumbs = [
      { label: "アクセス許可", href: "/permit" },
      { label: "ポリシー", href: "/permit/policy" },
      {
        label: "create-entity-poricy",
        href: "/permit/policy/c99fc6e0-6e62-4de2-8a7e-5c608ceaa8c6",
      },
    ];

    renderWithContext(breadcrumbs);

    expect(
      screen.getByRole("link", { name: "" }).querySelector("svg")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "アクセス許可" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ポリシー" })).toBeInTheDocument();
    expect(screen.getByText("create-entity-poricy")).toBeInTheDocument();
  });

  it("renders with 4 or more  breadcrumbs", () => {
    const breadcrumbs = [
      { label: "アクセス許可", href: "/permit" },
      { label: "ポリシー", href: "/permit/policy" },
      {
        label: "create-entity-poricy",
        href: "/permit/policy/c99fc6e0-6e62-4de2-8a7e-5c608ceaa8c6",
      },
      {
        label: "編集",
        href: "/permit/policy/c99fc6e0-6e62-4de2-8a7e-5c608ceaa8c6/edit",
      },
    ];

    renderWithContext(breadcrumbs);

    expect(
      screen.getByRole("link", { name: "" }).querySelector("svg")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "create-entity-poricy" })
    ).toBeInTheDocument();
    expect(screen.getByText("編集")).toBeInTheDocument();
  });

  it("renders when the dropdown menu is open", async () => {
    const breadcrumbs = [
      { label: "アクセス許可", href: "/permit" },
      { label: "ポリシー", href: "/permit/policy" },
      {
        label: "create-entity-poricy",
        href: "/permit/policy/c99fc6e0-6e62-4de2-8a7e-5c608ceaa8c6",
      },
      {
        label: "編集",
        href: "/permit/policy/c99fc6e0-6e62-4de2-8a7e-5c608ceaa8c6/edit",
      },
    ];

    renderWithContext(breadcrumbs);

    userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "アクセス許可" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "ポリシー" })
      ).toBeInTheDocument();
    });
  });
});
