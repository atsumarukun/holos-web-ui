import type { Preview } from "@storybook/nextjs";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
