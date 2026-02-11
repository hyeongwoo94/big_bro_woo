import type { Meta, StoryObj } from "@storybook/react";
import DesignTokenPreview from "./DesignTokenPreview";

const meta: Meta<typeof DesignTokenPreview> = {
  title: "shared/DesignTokenPreview",
  component: DesignTokenPreview,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DesignTokenPreview>;

export const Light: Story = {
  args: { theme: "light" },
};

export const Dark: Story = {
  args: { theme: "dark" },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
