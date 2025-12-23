import { Meta, StoryObj } from "@storybook/nextjs";
import { InputField } from "./InputField";

const mockRegisterReturn = {
  name: "mock",
  onChange: () => Promise.resolve(),
  onBlur: () => Promise.resolve(),
  ref: () => {},
};

const meta = {
  title: "Common/Molecules/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: false,
    },
    registerReturn: {
      control: false,
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "name",
    label: "アカウント名",
    registerReturn: mockRegisterReturn,
  },
};

export const IsRequired: Story = {
  args: {
    id: "name",
    label: "アカウント名",
    isRequired: true,
    registerReturn: mockRegisterReturn,
  },
};

export const WithError: Story = {
  args: {
    id: "name",
    label: "アカウント名",
    error: "アカウント名は必須です.",
    isRequired: true,
    registerReturn: mockRegisterReturn,
  },
};
