import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from "@/packages/input";
import "@/packages/input/styles/_index.scss";

export default {
  title: "Example/Input",
  component: Input,
  argTypes: {
    suffixIcon: { control: "object" },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: "large",
};

const PwdTemplate: ComponentStory<typeof Input.Password> = (args) => (
  <Input.Password {...args} />
);
export const Password = PwdTemplate.bind({});
Password.args = {
  size: "large",
};
