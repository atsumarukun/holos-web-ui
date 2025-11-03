import { Meta, StoryObj } from "@storybook/nextjs";
import { Alert } from ".";

const meta = {
  title: "Common/Atoms/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "The account does not exist or the password is incorrect.",
  },
};
