import { Meta, StoryObj } from "@storybook/nextjs";
import { UpdateEntryFormDialog } from "./UpdateEntryFormDialog";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { refetchContext } from "@/providers/refetch";

const meta = {
  title: "Storage/Organisms/UpdateEntryFormDialog",
  component: UpdateEntryFormDialog,
  args: {
    volumeName: "volume",
    currentKey: "key",
    defaultValues: { name: "sample.txt" },
    open: false,
    onOpenChange: fn(),
  },
  argTypes: {
    defaultValues: {
      control: false,
    },
    open: {
      control: false,
    },
  },
} satisfies Meta<typeof UpdateEntryFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <refetchContext.Provider value={{ refetch: fn(), setRefetch: fn() }}>
        <Button label="開く" onClick={() => setOpen(true)} />
        <UpdateEntryFormDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </refetchContext.Provider>
    );
  },
};
