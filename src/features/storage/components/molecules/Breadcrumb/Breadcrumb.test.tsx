import { render, screen, waitFor } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";
import { userEvent } from "@testing-library/user-event";

const onClickPartMock = jest.fn();

describe("Storage/Molecules/Breadcrumb", () => {
  it("renders", () => {
    const { container } = render(
      <Breadcrumb
        volumeName="volume"
        entryKey="key/sample.txt"
        onClickPart={onClickPartMock}
      />,
    );
    expect(screen.getByRole("button", { name: "volume" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "key" })).toBeInTheDocument();
    expect(screen.getByText("sample.txt")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "sample.txt" }),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });

  it("renders only volume name", () => {
    const { container } = render(
      <Breadcrumb
        volumeName="volume"
        entryKey=""
        onClickPart={onClickPartMock}
      />,
    );
    expect(screen.getByText("volume")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "volume" }),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll("svg")).toHaveLength(0);
  });

  it("calls onClickPart when volume name button is clicked", async () => {
    render(
      <Breadcrumb
        volumeName="volume"
        entryKey="key/sample.txt"
        onClickPart={onClickPartMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "volume" }));

    await waitFor(() => {
      expect(onClickPartMock).toHaveBeenCalled();
    });
  });

  it("calls onClickPart when key part is clicked", async () => {
    render(
      <Breadcrumb
        volumeName="volume"
        entryKey="key/sample.txt"
        onClickPart={onClickPartMock}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "key" }));

    await waitFor(() => {
      expect(onClickPartMock).toHaveBeenCalled();
    });
  });
});
