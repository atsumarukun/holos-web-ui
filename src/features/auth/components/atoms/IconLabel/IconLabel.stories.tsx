import { Meta, StoryObj } from "@storybook/nextjs";
import { IconLabel } from ".";
import { iconLabelVariants } from "./styles";
import { LuUserRound } from "react-icons/lu";

const meta = {
  title: "Auth/Atoms/IconLabel",
  component: IconLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(iconLabelVariants),
    },
    htmlFor: {
      control: false,
    },
    icon: {
      control: false,
    },
  },
} satisfies Meta<typeof IconLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    htmlFor: "name",
    icon: LuUserRound,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    htmlFor: "name",
    icon: LuUserRound,
  },
};
