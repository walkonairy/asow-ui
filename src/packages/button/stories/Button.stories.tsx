import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "@/packages/button";
import "@/packages/button/styles/_index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    icon: { control: "string" },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: "Submit",
  type: "primary",
  size: "large",
};

export const Small = Template.bind({});
Small.args = {
  children: "Submit",
  type: "primary",
  size: "small",
};
