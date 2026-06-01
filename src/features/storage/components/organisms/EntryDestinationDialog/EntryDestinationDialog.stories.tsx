import { Meta, StoryObj } from "@storybook/nextjs";
import { EntryDestinationDialog } from "./EntryDestinationDialog";
import * as EntryDestinationListHook from "@/features/storage/hooks/entry-destination-list";
import { createMock } from "storybook-addon-module-mock";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";

const meta = {
  title: "Storage/Organisms/EntryDestinationDialog",
  component: EntryDestinationDialog,
  args: {
    volumeName: "volume",
    currentKey: "key",
    entryKeys: ["volume/sample.txt"],
    open: false,
    onOpenChange: fn(),
  },
  argTypes: {
    volumeName: {
      control: false,
    },
    currentKey: {
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
        const mock = createMock(
          EntryDestinationListHook,
          "useEntryDestinationList",
        );
        mock.mockReturnValue({
          loading: false,
          entries: [
            {
              key: "key/sample.txt",
              size: 4,
              type: "text/plain; charset=utf-8",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          error: undefined,
        });
      },
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button label="開く" onClick={() => setOpen(true)} />
        <EntryDestinationDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </>
    );
  },
} satisfies Meta<typeof EntryDestinationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Copy: Story = {
  args: {
    mode: "copy",
  },
};

export const Move: Story = {
  args: {
    mode: "move",
  },
};
