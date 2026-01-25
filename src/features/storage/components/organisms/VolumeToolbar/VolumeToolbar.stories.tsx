import { Meta, StoryObj } from "@storybook/nextjs";
import { VolumeToolbar } from "./VolumeToolbar";
import { fn } from "storybook/test";

const meta = {
  title: "Storage/Organisms/VolumeToolbar",
  component: VolumeToolbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    refetch: fn(),
  },
} satisfies Meta<typeof VolumeToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
