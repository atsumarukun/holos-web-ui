import { Meta, StoryObj } from "@storybook/nextjs";
import { Menu } from ".";

const meta = {
  title: "Common/Organisms/Menu",
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
