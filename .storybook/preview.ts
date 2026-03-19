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
    backgrounds: {
      options: {
        white: { name: "White", value: "#ffffff" },
        light: { name: "Light", value: "#f4f6f8" },
      },
    },
    layout: "centered",
  },
  initialGlobals: {
    backgrounds: { value: "white" },
  },
  tags: ["autodocs"],
};

export default preview;
