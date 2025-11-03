import { Meta, StoryObj } from "@storybook/nextjs";
import { SearchBox } from "./SearchBox";

const meta = {
  title: "Common/Molecules/SearchBox",
  component: SearchBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
