import { Meta, StoryObj } from "@storybook/nextjs";
import { InputField } from ".";
import { LuUserRound } from "react-icons/lu";

const mockRegisterReturn = {
  name: "mock",
  onChange: () => Promise.resolve(),
  onBlur: () => Promise.resolve(),
  ref: () => {},
};

const meta = {
  title: "Molecules/AuthInputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: false,
    },
    icon: {
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
    placeholder: "アカウント名",
    id: "name",
    icon: LuUserRound,
    registerReturn: mockRegisterReturn,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "アカウント名",
    error: "アカウント名は必須です.",
    id: "name",
    icon: LuUserRound,
    registerReturn: mockRegisterReturn,
  },
};
