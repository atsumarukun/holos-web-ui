import { Meta, StoryObj } from "@storybook/nextjs";
import { SelectedVolumesDropdownMenu } from "./SelectedVolumesDropdownMenu";

const meta = {
  title: "Storage/Organisms/SelectedVolumesDropdownMenu",
  component: SelectedVolumesDropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectedVolumesDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    volumes: ["holos"],
  },
};

export const NotSelected: Story = {
  args: {
    volumes: [],
  },
};
