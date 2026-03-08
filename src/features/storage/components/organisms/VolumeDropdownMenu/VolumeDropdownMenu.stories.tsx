import { Meta, StoryObj } from "@storybook/nextjs";
import { VolumeDropdownMenu } from "./VolumeDropdownMenu";

const meta = {
  title: "Storage/Organisms/VolumeDropdownMenu",
  component: VolumeDropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    volume: {
      name: "holos",
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  argTypes: {
    volume: {
      control: false,
    },
  },
} satisfies Meta<typeof VolumeDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
