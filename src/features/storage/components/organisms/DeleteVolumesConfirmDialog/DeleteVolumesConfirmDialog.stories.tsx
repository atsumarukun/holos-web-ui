import { Meta, StoryObj } from "@storybook/nextjs";
import { DeleteVolumesConfirmDialog } from "./DeleteVolumesConfirmDialog";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { fn } from "storybook/test";

const meta = {
  title: "Storage/Organisms/DeleteVolumesConfirmDialog",
  component: DeleteVolumesConfirmDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    names: ["holos"],
    open: false,
    onOpenChange: fn(),
    refetch: fn(),
  },
  argTypes: {
    open: {
      control: false,
    },
  },
} satisfies Meta<typeof DeleteVolumesConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button label="開く" onClick={() => setOpen(true)} />
        <DeleteVolumesConfirmDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
        />
      </>
    );
  },
};
