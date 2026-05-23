import { Meta, StoryObj } from "@storybook/nextjs";
import { Breadcrumb } from "./Breadcrumb";
import { fn } from "storybook/test";

const meta = {
  title: "Storage/Molecules/Breadcrumb",
  component: Breadcrumb,
  args: {
    volumeName: "volume",
    entryKey: "key/sample.txt",
    onClickPart: fn(),
  },
  argTypes: {
    onClickPart: {
      control: false,
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
