import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { EntryDestinationList } from "./EntryDestinationList";

const now = new Date();
const mockEntries = [
  {
    key: "key/sample",
    size: 4,
    type: "folder",
    createdAt: now,
    updatedAt: now,
  },
  {
    key: "key/sample.txt",
    size: 4,
    type: "text/plain; charset=utf-8",
    createdAt: now,
    updatedAt: now,
  },
];

const onSelectMock = jest.fn();

describe("Storage/Molecules/EntryDestinationList", () => {
  it("renders", () => {
    render(
      <EntryDestinationList entries={mockEntries} onSelect={onSelectMock} />,
    );

    expect(screen.getByText("エントリー名")).toBeInTheDocument();
    expect(screen.getByText("タイプ")).toBeInTheDocument();
    expect(screen.getByText("最終更新日時")).toBeInTheDocument();

    expect(screen.getAllByRole("button")).toHaveLength(1);

    expect(screen.getByText("sample")).toBeInTheDocument();
    expect(screen.getByText("sample.txt")).toBeInTheDocument();

    expect(screen.getByText("folder")).toBeInTheDocument();
    expect(screen.getByText("text/plain; charset=utf-8")).toBeInTheDocument();
  });

  it("calls onSelect when folder entry is clicked", async () => {
    render(
      <EntryDestinationList entries={mockEntries} onSelect={onSelectMock} />,
    );

    await userEvent.click(screen.getByRole("button"));
    expect(onSelectMock).toHaveBeenCalledWith("key/sample");
  });
});
