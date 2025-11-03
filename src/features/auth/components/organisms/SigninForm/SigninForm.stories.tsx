import { Meta, StoryObj } from "@storybook/nextjs";
import { SigninForm } from ".";

const meta = {
  title: "Auth/Organisms/SigninForm",
  component: SigninForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SigninForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
