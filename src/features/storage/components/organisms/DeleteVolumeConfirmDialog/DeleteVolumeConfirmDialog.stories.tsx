import { Meta, StoryObj } from "@storybook/nextjs";
import { DeleteVolumeConfirmDialog } from "./DeleteVolumeConfirmDialog";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";

const meta = {
  title: "Storage/Organisms/DeleteVolumeConfirmDialog",
  component: DeleteVolumeConfirmDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    name: "holos",
    open: false,
    onOpenChange: fn(),
    refetch: fn(),
  },
  argTypes: {
    open: {
      control: false,
    },
  },
} satisfies Meta<typeof DeleteVolumeConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button label="開く" onClick={() => setOpen(true)} />
        <DeleteVolumeConfirmDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </>
    );
  },
};
