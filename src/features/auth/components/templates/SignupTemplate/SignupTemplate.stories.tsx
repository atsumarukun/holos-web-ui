import { Meta, StoryObj } from "@storybook/nextjs";
import { SignupTemplate } from ".";

const meta = {
  title: "Auth/Templates/SignupTemplate",
  component: SignupTemplate,
} satisfies Meta<typeof SignupTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
