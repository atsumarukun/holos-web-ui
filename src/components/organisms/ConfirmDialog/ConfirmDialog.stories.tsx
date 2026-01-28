import { Meta, StoryObj } from "@storybook/nextjs";
import { ConfirmDialog } from "./ConfirmDialog";
import { fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";

const meta = {
  title: "Common/Organisms/ConfirmDialog",
  component: ConfirmDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: false,
    },
  },
  args: {
    open: false,
    onOpenChange: fn(),
    onApprove: fn(),
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "アカウント削除",
    description:
      "アカウントを削除しますか？\n削除したアカウントは復元できません.",
    approveLabel: "削除",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    const onApprove = () => {
      setOpen(false);
    };

    return (
      <>
        <Button label="開く" onClick={() => setOpen(true)} />
        <ConfirmDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
          onApprove={onApprove}
        />
      </>
    );
  },
};
