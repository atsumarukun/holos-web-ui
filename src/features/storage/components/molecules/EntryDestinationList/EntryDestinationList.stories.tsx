import { Meta, StoryObj } from "@storybook/nextjs";
import { EntryDestinationList } from "./EntryDestinationList";
import { fn } from "storybook/test";

const meta = {
  title: "Storage/Molecules/EntryDestinationList",
  component: EntryDestinationList,
  parameters: {
    layout: "fullscreen",
  },
  decorators: (Story) => (
    <div className="flex h-screen items-center mx-64">
      <Story />
    </div>
  ),
  args: {
    entries: [
      {
        key: "key/folder",
        size: 4,
        type: "folder",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: "key/sample.txt",
        size: 4,
        type: "text/plain; charset=utf-8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    onSelect: fn(),
  },
  argTypes: {
    onSelect: {
      control: false,
    },
  },
} satisfies Meta<typeof EntryDestinationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
