import { Meta, StoryObj } from "@storybook/nextjs";
import { SignupTemplate } from ".";

const meta = {
  title: "Auth/Templates/SignupTemplate",
  component: SignupTemplate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SignupTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
