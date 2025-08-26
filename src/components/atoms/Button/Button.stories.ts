import { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from ".";
import { LuSettings } from "react-icons/lu";
import { fn } from "storybook/test";
import { buttonVariants } from "./styles";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(buttonVariants),
    },
    icon: {
      control: false,
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
    variant: "default",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Button",
    variant: "default",
    icon: LuSettings,
  },
};

export const Outline: Story = {
  args: {
    label: "Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    label: "Button",
    variant: "ghost",
  },
};
