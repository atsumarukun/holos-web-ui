import { render, screen } from "@testing-library/react";
import { VolumeDropdownMenu } from "./VolumeDropdownMenu";
import userEvent from "@testing-library/user-event";

const refetchMock = jest.fn();

describe("Storage/Organisms/VolumeDropdownMenu", () => {
  it("renders", () => {
    render(
      <VolumeDropdownMenu
        volume={{
          name: "holos",
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        refetch={refetchMock}
      />,
    );
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders dropdown menu items when opened", async () => {
    render(
      <VolumeDropdownMenu
        volume={{
          name: "holos",
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        refetch={refetchMock}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("opens update dialog when edit is clicked", async () => {
    render(
      <VolumeDropdownMenu
        volume={{
          name: "holos",
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        refetch={refetchMock}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("編集"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens delete dialog when delete is clicked", async () => {
    render(
      <VolumeDropdownMenu
        volume={{
          name: "holos",
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        refetch={refetchMock}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("削除"));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});
