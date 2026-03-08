import { Meta, StoryObj } from "@storybook/nextjs";
import { VolumeList } from "./VolumeList";
import { refetchContext } from "@/providers/refetch";
import { fn } from "storybook/test";
import * as VolumeListHook from "@/features/storage/hooks/volume-list";
import { createMock } from "storybook-addon-module-mock";

const meta = {
  title: "Storage/Organisms/VolumeList",
  component: VolumeList,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: (Story) => (
    <refetchContext.Provider value={{ refetch: fn(), setRefetch: fn() }}>
      <div className="flex h-screen items-center mx-6">
        <Story />
      </div>
    </refetchContext.Provider>
  ),
} satisfies Meta<typeof VolumeList>;

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
