import { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./Input";
import { inputVariants } from "./styles";

const meta = {
  title: "Common/Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(inputVariants),
    },
    id: {
      control: false,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    id: "name",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    id: "name",
  },
};

export const WithPlaceholder: Story = {
  args: {
    variant: "default",
    placeholder: "名前",
    id: "name",
  },
};
