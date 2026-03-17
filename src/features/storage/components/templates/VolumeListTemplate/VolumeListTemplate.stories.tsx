import { Meta, StoryObj } from "@storybook/nextjs";
import { VolumeListTemplate } from "./VolumeListTemplate";
import { createMock } from "storybook-addon-module-mock";
import * as VolumeListHook from "@/features/storage/hooks/volume-list";
import { fn } from "storybook/test";

const meta = {
  title: "Storage/Templates/VolumeListTemplate",
  component: VolumeListTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: (Story) => (
    <div className="h-screen m-6">
      <Story />
    </div>
  ),
} satisfies Meta<typeof VolumeListTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(VolumeListHook, "useVolumeList");
        mock.mockReturnValue({
          loading: false,
          success: true,
          volumes: [
            {
              name: "holos",
              isPublic: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          refetch: fn(),
        });
        return [mock];
      },
    },
  },
};
