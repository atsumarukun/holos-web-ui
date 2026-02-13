import { Meta, StoryObj } from "@storybook/nextjs";
import { VolumeDropdownMenu } from "./VolumeDropdownMenu";
import { fn } from "storybook/test";

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
    refetch: fn(),
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
