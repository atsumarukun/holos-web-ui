import { Meta, StoryObj } from "@storybook/nextjs";
import { Error } from "./Error";

const meta = {
  title: "Common/Molecules/Error",
  component: Error,
  argTypes: {
    icon: {
      control: false,
    },
  },
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  args: {
    variant: "page",
    title: "エラーが発生しました",
    description: "再度ページを読み込み直してください.",
  },
};

export const Dialog: Story = {
  args: {
    variant: "dialog",
    title: "エラーが発生しました",
    description: "再度ダイアログを読み込み直してください.",
  },
};

export const WithoutDescription: Story = {
  args: {
    variant: "page",
    title: "エラーが発生しました",
  },
};
