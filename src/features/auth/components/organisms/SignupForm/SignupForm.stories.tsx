import { Meta, StoryObj } from "@storybook/nextjs";
import { SignupForm } from ".";

const meta = {
  title: "Auth/Organisms/SignupForm",
  component: SignupForm,
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
