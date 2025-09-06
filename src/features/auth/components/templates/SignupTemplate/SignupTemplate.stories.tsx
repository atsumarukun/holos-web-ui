import { Meta, StoryObj } from "@storybook/nextjs";
import { SignupTemplate } from ".";

const meta = {
  title: "Templates/AuthSignupTemplate",
  component: SignupTemplate,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SignupTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
