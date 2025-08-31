import { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from ".";
import { inputVariants } from "./styles";

const meta = {
  title: "Atoms/AuthInput",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(inputVariants),
    },
    id: {
      control: false,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    placeholder: "アカウント名",
    id: "name",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    placeholder: "アカウント名",
    id: "name",
  },
};
