import { Meta, StoryObj } from "@storybook/nextjs";
import { headers } from "@storybook/nextjs/headers.mock";
import { WorkspaceLayout } from "./WorkspaceLayout";

const meta = {
  title: "Common/Layouts/WorkspaceLayout",
  component: WorkspaceLayout,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof WorkspaceLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  async beforeEach() {
    headers().set("account-name", "storybook");
  },
  args: {
    children: <></>,
  },
};
