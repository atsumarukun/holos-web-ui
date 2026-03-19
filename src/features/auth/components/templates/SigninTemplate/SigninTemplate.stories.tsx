import { Meta, StoryObj } from "@storybook/nextjs";
import { SigninTemplate } from ".";

const meta = {
  title: "Auth/Templates/SigninTemplate",
  component: SigninTemplate,
} satisfies Meta<typeof SigninTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
