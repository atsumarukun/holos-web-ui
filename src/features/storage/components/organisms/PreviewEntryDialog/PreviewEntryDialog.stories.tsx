import { Meta, StoryObj } from "@storybook/nextjs";
import { PreviewEntryDialog } from "./PreviewEntryDialog";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import * as PreviewLib from "@/features/storage/lib/preview";
import { createMock } from "storybook-addon-module-mock";

const meta = {
  title: "Storage/Organisms/PreviewEntryDialog",
  component: PreviewEntryDialog,
  args: {
    volumeName: "volume",
    entry: {
      key: "key/sample.jpg",
      size: 39662,
      type: "image/jpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    open: false,
    onOpenChange: fn(),
  },
  argTypes: {
    volumeName: {
      control: false,
    },
    entry: {
      control: false,
    },
    open: {
      control: false,
    },
    onOpenChange: {
      control: false,
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
} satisfies Meta<typeof PreviewEntryDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defailt: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button label="開く" onClick={() => setOpen(true)} />
        <PreviewEntryDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </>
    );
  },
};
