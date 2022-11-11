import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import "@/packages/icon/styles/_index.scss";
import { Icon } from "@/index";

export default {
  title: "Example/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: "sun",
};
