import { Meta, StoryObj } from "@storybook/nextjs";
import { EntryToolbar } from "./EntryToolbar";

const meta = {
  title: "Storage/Organisms/EntryToolbar",
  component: EntryToolbar,
  args: {
    volumeName: "volume",
    currentKey: "key",
  },
} satisfies Meta<typeof EntryToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
