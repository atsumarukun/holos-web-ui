import { Meta, StoryObj } from "@storybook/nextjs";
import { VolumeList } from "./VolumeList";
import { fn } from "storybook/test";

const meta = {
  title: "Storage/Organisms/VolumeList",
  component: VolumeList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    volumes: [
      {
        name: "holos",
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    refetch: fn(),
  },
} satisfies Meta<typeof VolumeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
