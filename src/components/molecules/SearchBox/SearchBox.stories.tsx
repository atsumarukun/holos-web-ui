import { Meta, StoryObj } from "@storybook/nextjs";
import { SearchBox } from "./SearchBox";

const meta = {
  title: "Common/Molecules/SearchBox",
  component: SearchBox,
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
