import { Meta, StoryObj } from "@storybook/nextjs";
import { EntryList } from "./EntryList";
import { refetchContext } from "@/providers/refetch";
import { fn } from "storybook/test";
import * as EntryListHook from "@/features/storage/hooks/entry-list";
import { createMock } from "storybook-addon-module-mock";

const meta = {
  title: "Storage/Organisms/EntryList",
  component: EntryList,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    volumeName: "volume",
    currentKey: "key",
  },
  decorators: (Story) => (
    <refetchContext.Provider value={{ refetch: fn(), setRefetch: fn() }}>
      <div className="flex h-screen items-center mx-32">
        <Story />
      </div>
    </refetchContext.Provider>
  ),
} satisfies Meta<typeof EntryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(EntryListHook, "useEntryList");
        mock.mockReturnValue({
          loading: false,
          entries: [
            {
              key: "key/sample.txt",
              size: 4,
              type: "text/plain; charset=utf-8",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          error: undefined,
          refetch: fn(),
        });
        return [mock];
      },
    },
  },
};
