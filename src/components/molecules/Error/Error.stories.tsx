import { Meta, StoryObj } from "@storybook/nextjs";
import { Error } from "./Error";

const meta = {
  title: "Common/Molecules/Error",
  component: Error,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: false,
    },
  },
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "エラーが発生しました",
    description: "再度ページを読み込み直してください.",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "エラーが発生しました",
  },
};
