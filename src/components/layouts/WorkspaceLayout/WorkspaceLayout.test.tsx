import { render, screen } from "@testing-library/react";
import { WorkspaceLayout } from "./WorkspaceLayout";

const headersMock = jest.fn();
jest.mock("next/headers", () => ({
  headers: () => headersMock(),
}));

const pathnameMock = jest.fn();
const pushMock = jest.fn();
const redirectMock = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => pathnameMock(),
  useRouter: () => ({ push: pushMock }),
  redirect: (...args: unknown[]) => redirectMock(...args),
}));

jest.mock("@/components/organisms/Header", () => ({
  Header: () => <header />,
}));

jest.mock("@/components/organisms/Menu", () => ({
  Menu: () => <nav />,
}));

describe("Common/Layouts/WorkspaceLayout", () => {
  it("renders", async () => {
    headersMock.mockResolvedValue(new Headers({ "account-name": "test" }));
    pathnameMock.mockReturnValue("/");

    render(await WorkspaceLayout({ children: <p>test</p> }));
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("complementary")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("redirects when account-name is not set", async () => {
    headersMock.mockResolvedValue(new Headers());
    pathnameMock.mockReturnValue("/");

    render(await WorkspaceLayout({ children: <p>test</p> }));

    expect(redirectMock).toHaveBeenCalledWith("/auth/signin");
  });
});
