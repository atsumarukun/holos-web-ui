import { Meta, StoryObj } from "@storybook/nextjs";
import { Avatar } from "./Avatar";

const meta = {
  title: "Common/Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    accountName: {
      control: "text",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accountName: "sample",
  },
};
