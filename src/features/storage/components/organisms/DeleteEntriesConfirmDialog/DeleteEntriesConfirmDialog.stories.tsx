import { Meta, StoryObj } from "@storybook/nextjs";
import { DeleteEntriesConfirmDialog } from "./DeleteEntriesConfirmDialog";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { fn } from "storybook/test";
import { refetchContext } from "@/providers/refetch";

const meta = {
  title: "Storage/Organisms/DeleteEntriesConfirmDialog",
  component: DeleteEntriesConfirmDialog,
  args: {
    volumeName: "volume",
    entryKeys: ["key/sample.txt"],
    open: false,
    onOpenChange: fn(),
  },
  argTypes: {
    open: {
      control: false,
    },
  },
} satisfies Meta<typeof DeleteEntriesConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <refetchContext.Provider value={{ refetch: fn(), setRefetch: fn() }}>
        <Button label="開く" onClick={() => setOpen(true)} />
        <DeleteEntriesConfirmDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </refetchContext.Provider>
    );
  },
};
