import { Meta, StoryObj } from "@storybook/nextjs";
import { CreateEntryFormDialog } from "./CreateEntryFormDialog";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { refetchContext } from "@/providers/refetch";

const meta = {
  title: "Storage/Organisms/CreateEntryFormDialog",
  component: CreateEntryFormDialog,
  args: {
    volumeName: "volume",
    currentKey: "",
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
  },
} satisfies Meta<typeof CreateEntryFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <refetchContext.Provider value={{ refetch: fn(), setRefetch: fn() }}>
        <Button label="開く" onClick={() => setOpen(true)} />
        <CreateEntryFormDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </refetchContext.Provider>
    );
  },
};
