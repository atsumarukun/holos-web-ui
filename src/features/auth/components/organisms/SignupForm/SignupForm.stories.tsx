import { Meta, StoryObj } from "@storybook/nextjs";
import { SignupForm } from ".";

const meta = {
  title: "Auth/Organisms/SignupForm",
  component: SignupForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
