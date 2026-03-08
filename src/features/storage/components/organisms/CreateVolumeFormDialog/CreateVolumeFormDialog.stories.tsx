import { Meta, StoryObj } from "@storybook/nextjs";
import { CreateVolumeFormDialog } from "./CreateVolumeFormDialog";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { refetchContext } from "@/providers/refetch";

const meta = {
  title: "Storage/Organisms/CreateVolumeFormDialog",
  component: CreateVolumeFormDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    open: false,
    onOpenChange: fn(),
  },
  argTypes: {
    open: {
      control: false,
    },
  },
} satisfies Meta<typeof CreateVolumeFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <refetchContext.Provider value={{ refetch: fn(), setRefetch: fn() }}>
        <Button label="開く" onClick={() => setOpen(true)} />
        <CreateVolumeFormDialog
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </refetchContext.Provider>
    );
  },
};
