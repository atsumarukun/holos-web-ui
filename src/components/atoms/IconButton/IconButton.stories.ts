import { Meta, StoryObj } from "@storybook/nextjs";
import { IconButton } from ".";
import { LuSettings } from "react-icons/lu";
import { fn } from "storybook/test";
import { iconButtonVariants } from "./styles";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(iconButtonVariants),
    },
    icon: {
      control: false,
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: LuSettings,
    variant: "default",
  },
};

export const Outline: Story = {
  args: {
    icon: LuSettings,
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    icon: LuSettings,
    variant: "ghost",
  },
};
