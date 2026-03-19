import { Meta, StoryObj } from "@storybook/nextjs";
import { Heading } from "./Heading";

const meta = {
  title: "Common/Atoms/Heading",
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "ホーム",
  },
};
