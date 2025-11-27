import { Meta, StoryObj } from "@storybook/nextjs";
import { RequiredBadge } from "./RequiredBadge";

const meta = {
  title: "Common/Atoms/RequiredBadge",
  component: RequiredBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RequiredBadge>;

export default meta;
type Story = StoryObj<typeof RequiredBadge>;

export const Default: Story = {};
