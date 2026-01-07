import { Meta, StoryObj } from "@storybook/nextjs";
import { FormDialog } from "./FormDialog";
import { FormEvent, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { fn } from "storybook/test";

const meta = {
  title: "Common/Organisms/FormDialog",
  component: FormDialog,
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
    onSubmit: fn(),
  },
} satisfies Meta<typeof FormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "アカウント作成",
    submitLabel: "作成",
    children: (
      <div className="flex flex-col gap-0.5">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="name">名前</label>
        </div>
        <div>
          <Input id="name" variant="default" className="w-full" />
        </div>
      </div>
    ),
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setOpen(false);
    };

    return (
      <>
        <Button label="開く" onClick={() => setOpen(true)} />
        <FormDialog
          {...args}
          open={open}
          onOpenChange={() => setOpen((v) => !v)}
          onSubmit={onSubmit}
        />
      </>
    );
  },
};
