import { Meta, StoryObj } from "@storybook/nextjs";
import { EntryListTemplate } from "./EntryListTemplate";
import { createMock } from "storybook-addon-module-mock";
import * as EntryListHook from "@/features/storage/hooks/entry-list";
import { fn } from "storybook/test";

const meta = {
  title: "Storage/Templates/EntryListTemplate",
  component: EntryListTemplate,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    volumeName: "volume",
    currentKey: "key",
  },
  decorators: (Story) => (
    <div className="h-screen flex items-center mx-64">
      <div className="grow">
        <Story />
      </div>
    </div>
  ),
} satisfies Meta<typeof EntryListTemplate>;

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
