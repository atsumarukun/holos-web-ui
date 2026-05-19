import { Meta, StoryObj } from "@storybook/nextjs";
import { DeleteEntryConfirmDialog } from "./DeleteEntryConfirmDialog";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { refetchContext } from "@/providers/refetch";

const meta = {
  title: "Storage/Organisms/DeleteEntryConfirmDialog",
  component: DeleteEntryConfirmDialog,
  args: {
    volumeName: "volume",
    entryKey: "key/sample.txt",
    open: false,
    onOpenChange: fn(),
  },
  argTypes: {
    open: {
      control: false,
    },
  },
} satisfies Meta<typeof DeleteEntryConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <refetchContext.Provider value={{ refetch: fn(), setRefetch: fn() }}>
        <Button label="開く" onClick={() => setOpen(true)} />
        <DeleteEntryConfirmDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </refetchContext.Provider>
    );
  },
};
