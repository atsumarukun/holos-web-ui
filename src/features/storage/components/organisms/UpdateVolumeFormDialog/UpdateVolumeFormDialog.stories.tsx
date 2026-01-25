import { Meta, StoryObj } from "@storybook/nextjs";
import { UpdateVolumeFormDialog } from "./UpdateVolumeFormDialog";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";

const meta = {
  title: "Storage/Organisms/UpdateVolumeFormDialog",
  component: UpdateVolumeFormDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    defaultValues: { name: "holos", isPublic: true },
    open: false,
    onOpenChange: fn(),
    refetch: fn(),
  },
  argTypes: {
    defaultValues: {
      control: false,
    },
    open: {
      control: false,
    },
  },
} satisfies Meta<typeof UpdateVolumeFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button label="開く" onClick={() => setOpen(true)} />
        <UpdateVolumeFormDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </>
    );
  },
};
