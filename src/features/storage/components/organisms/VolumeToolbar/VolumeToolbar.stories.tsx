import { Meta, StoryObj } from "@storybook/nextjs";
import { VolumeToolbar } from "./VolumeToolbar";

const meta = {
  title: "Storage/Organisms/VolumeToolbar",
  component: VolumeToolbar,
} satisfies Meta<typeof VolumeToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
