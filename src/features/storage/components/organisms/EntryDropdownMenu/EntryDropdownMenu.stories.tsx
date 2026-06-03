import { Meta, StoryObj } from "@storybook/nextjs";
import { EntryDropdownMenu } from "./EntryDropdownMenu";

const meta = {
  title: "Storage/Organisms/EntryDropdownMenu",
  component: EntryDropdownMenu,
  args: {
    volumeName: "volume",
    currentKey: "key",
    entry: {
      key: "key/update.txt",
      size: 4,
      type: "text/plain; charset=utf-8",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  argTypes: {
    volumeName: {
      control: false,
    },
    currentKey: {
      control: false,
    },
    entry: {
      control: false,
    },
  },
} satisfies Meta<typeof EntryDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
