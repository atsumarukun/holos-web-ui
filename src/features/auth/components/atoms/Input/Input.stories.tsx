import { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from ".";
import { inputVariants } from "./styles";
import { LuUserRound } from "react-icons/lu";

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
    icon: {
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
    icon: LuUserRound,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    placeholder: "アカウント名",
    id: "name",
    icon: LuUserRound,
  },
};
