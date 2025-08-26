import { Meta, StoryObj } from "@storybook/nextjs";
import { Logo } from ".";
import { logoSizes } from "./styles";

const meta = {
  title: "Atoms/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(logoSizes),
    },
    noIcon: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
};

export const NoIcon: Story = {
  args: {
    noIcon: true,
  },
};
