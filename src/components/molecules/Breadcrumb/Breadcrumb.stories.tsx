import { Meta, StoryObj } from "@storybook/nextjs";
import { Breadcrumb } from "./Breadcrumb";
import { breadcrumbContext } from "./provider";

const meta = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <breadcrumbContext.Provider
      value={{ breadcrumbs: [], setBreadcrumbs: () => {} }}
    >
      <Breadcrumb />
    </breadcrumbContext.Provider>
  ),
};

export const Omitted: Story = {
  render: () => (
    <breadcrumbContext.Provider
      value={{
        breadcrumbs: [
          { label: "アクセス許可", href: "/permit" },
          { label: "ポリシー", href: "/permit/policy" },
          {
            label: "create-entity-poricy",
            href: "/permit/policy/c99fc6e0-6e62-4de2-8a7e-5c608ceaa8c6",
          },
          {
            label: "編集",
            href: "/permit/policy/c99fc6e0-6e62-4de2-8a7e-5c608ceaa8c6/edit",
          },
        ],
        setBreadcrumbs: () => {},
      }}
    >
      <Breadcrumb />
    </breadcrumbContext.Provider>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/storage/images/2025-10-22/sample.png",
      },
    },
  },
};
