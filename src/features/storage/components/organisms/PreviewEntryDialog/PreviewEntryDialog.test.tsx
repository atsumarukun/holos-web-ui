import { render, screen } from "@testing-library/react";
import { PreviewEntryDialog } from "./PreviewEntryDialog";

const onOpenChangeMock = jest.fn();

describe("Storage/Organisms/PreviewEntryDialog", () => {
  it("renders", () => {
    render(
      <PreviewEntryDialog
        volumeName="volume"
        entry={{
          key: "key/sample.jpg",
          size: 39662,
          type: "image/jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        open
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <PreviewEntryDialog
        volumeName="volume"
        entry={{
          key: "key/sample.jpg",
          size: 39662,
          type: "image/jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        open={false}
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
