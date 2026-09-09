import { Meta, StoryObj } from "@storybook/nextjs";
import { PreviewEntry } from "./PreviewEntry";
import * as PreviewLib from "@/features/storage/lib/preview";
import { createMock } from "storybook-addon-module-mock";

const meta = {
  title: "Storage/Molecules/PreviewEntry",
  component: PreviewEntry,
  argTypes: {
    volumeName: {
      control: false,
    },
    entry: {
      control: false,
    },
  },
} satisfies Meta<typeof PreviewEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    volumeName: "volume",
    entry: {
      key: "key/sample",
      size: 0,
      type: "application/octet-stream",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};

export const Image: Story = {
  args: {
    volumeName: "volume",
    entry: {
      key: "key/sample.jpg",
      size: 39662,
      type: "image/jpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(PreviewLib, "buildPreviewSrc");
        mock.mockReturnValue(
          "https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg",
        );
        return [mock];
      },
    },
  },
};

export const Video: Story = {
  args: {
    volumeName: "volume",
    entry: {
      key: "key/sample.mp4",
      size: 1128375,
      type: "video/mp4",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(PreviewLib, "buildPreviewSrc");
        mock.mockReturnValue(
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        );
        return [mock];
      },
    },
  },
};

export const Audio: Story = {
  args: {
    volumeName: "volume",
    entry: {
      key: "key/sample.mp3",
      size: 39868,
      type: "audio/mpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(PreviewLib, "buildPreviewSrc");
        mock.mockReturnValue(
          "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
        );
        return [mock];
      },
    },
  },
};

export const Pdf: Story = {
  args: {
    volumeName: "volume",
    entry: {
      key: "key/sample.pdf",
      size: 261419,
      type: "application/pdf",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(PreviewLib, "buildPreviewSrc");
        mock.mockReturnValue(
          "https://interactive-examples.mdn.mozilla.net/media/examples/In-CC0.pdf",
        );
        return [mock];
      },
    },
  },
};

export const Text: Story = {
  args: {
    volumeName: "volume",
    entry: {
      key: "key/sample.txt",
      size: 4,
      type: "text/plain; charset=utf-8",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(PreviewLib, "buildPreviewSrc");
        const blob = new Blob(["text"], {
          type: "text/plain; charset=utf-8",
        });
        mock.mockReturnValue(URL.createObjectURL(blob));
        return [mock];
      },
    },
  },
};
