import { Meta, StoryObj } from "@storybook/nextjs";
import { Header } from "./Header";
import { accountContext } from "@/providers/account";

const meta = {
  title: "Common/Organisms/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <accountContext.Provider value={{ accountName: "sample" }}>
      <Header />
    </accountContext.Provider>
  ),
};
