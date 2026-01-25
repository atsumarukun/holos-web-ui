import { Meta, StoryObj } from "@storybook/nextjs";
import { CreateVolumeFormDialog } from "./CreateVolumeFormDialog";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";

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
    refetch: fn(),
  },
} satisfies Meta<typeof CreateVolumeFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button label="開く" onClick={() => setOpen(true)} />
        <CreateVolumeFormDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </>
    );
  },
};
