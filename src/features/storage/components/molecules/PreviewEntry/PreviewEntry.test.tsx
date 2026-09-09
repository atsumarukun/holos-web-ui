import { render, screen } from "@testing-library/react";
import { PreviewEntry } from "./PreviewEntry";

describe("Storage/Molecules/PreviewEntry", () => {
  it("renders an image element", () => {
    render(
      <PreviewEntry
        volumeName="volume"
        entry={{
          key: "key/sample.jpg",
          size: 39662,
          type: "image/jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        className="custom-class"
      />,
    );

    expect(screen.getByRole("img", { name: "sample.jpg" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "sample.jpg" })).toHaveAttribute(
      "src",
      "/api/storage/entries/volume/key/sample.jpg",
    );
    expect(screen.getByRole("img", { name: "sample.jpg" })).toHaveClass(
      "custom-class",
    );
  });

  it("renders a video element", () => {
    const { container } = render(
      <PreviewEntry
        volumeName="volume"
        entry={{
          key: "key/sample.mp4",
          size: 1128375,
          type: "video/mp4",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        className="custom-class"
      />,
    );

    expect(container.querySelector("video")).toBeInTheDocument();
    expect(container.querySelector("video")).toHaveAttribute(
      "src",
      "/api/storage/entries/volume/key/sample.mp4",
    );
    expect(container.querySelector("video")).toHaveClass("custom-class");
  });

  it("renders an audio element", () => {
    const { container } = render(
      <PreviewEntry
        volumeName="volume"
        entry={{
          key: "key/sample.mp3",
          size: 39868,
          type: "audio/mpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        className="custom-class"
      />,
    );

    expect(container.querySelector("audio")).toBeInTheDocument();
    expect(container.querySelector("audio")).toHaveAttribute(
      "src",
      "/api/storage/entries/volume/key/sample.mp3",
    );
    expect(container.querySelector("audio")).toHaveClass("custom-class");
  });

  it("renders a text element", () => {
    const { container } = render(
      <PreviewEntry
        volumeName="volume"
        entry={{
          key: "key/sample.txt",
          size: 4,
          type: "text/plain; charset=utf-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        className="custom-class"
      />,
    );

    expect(container.querySelector("iframe")).toBeInTheDocument();
    expect(container.querySelector("iframe")).toHaveAttribute(
      "src",
      "/api/storage/entries/volume/key/sample.txt",
    );
    expect(container.querySelector("iframe")).toHaveClass("custom-class");
  });

  it("renders a pdf element", () => {
    const { container } = render(
      <PreviewEntry
        volumeName="volume"
        entry={{
          key: "key/sample.pdf",
          size: 261419,
          type: "application/pdf",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        className="custom-class"
      />,
    );

    expect(container.querySelector("iframe")).toBeInTheDocument();
    expect(container.querySelector("iframe")).toHaveAttribute(
      "src",
      "/api/storage/entries/volume/key/sample.pdf",
    );
    expect(container.querySelector("iframe")).toHaveClass("custom-class");
  });

  it("renders an unsupported type element", () => {
    render(
      <PreviewEntry
        volumeName="volume"
        entry={{
          key: "key/sample",
          size: 0,
          type: "application/octet-stream",
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        className="custom-class"
      />,
    );

    expect(screen.getByText("プレビューに失敗しました")).toBeInTheDocument();
    expect(
      screen.getByText("このエントリーはプレビューできません."),
    ).toBeInTheDocument();
  });
});
