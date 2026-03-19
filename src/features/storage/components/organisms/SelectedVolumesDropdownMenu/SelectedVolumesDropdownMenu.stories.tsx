import { Meta, StoryObj } from "@storybook/nextjs";
import { SelectedVolumesDropdownMenu } from "./SelectedVolumesDropdownMenu";

const meta = {
  title: "Storage/Organisms/SelectedVolumesDropdownMenu",
  component: SelectedVolumesDropdownMenu,
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
