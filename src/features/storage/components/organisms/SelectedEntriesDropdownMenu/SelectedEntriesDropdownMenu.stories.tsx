import { Meta, StoryObj } from "@storybook/nextjs";
import { SelectedEntriesDropdownMenu } from "./SelectedEntriesDropdownMenu";

const meta = {
  title: "Storage/Organisms/SelectedEntriesDropdownMenu",
  component: SelectedEntriesDropdownMenu,
  args: {
    volumeName: "volume",
    currentKey: "key",
  },
  argTypes: {
    volumeName: {
      control: false,
    },
    currentKey: {
      control: false,
    },
    entryKeys: {
      control: false,
    },
  },
} satisfies Meta<typeof SelectedEntriesDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entryKeys: ["key/sample.txt"],
  },
};

export const NotSelected: Story = {
  args: {
    entryKeys: [],
  },
};
