import React from "react";
import Input from "@/packages/input";
import { Icon } from "@/index";

const ExInput = () => {
  const [value, setValue] = React.useState("");

  return (
    <>
      <div style={{ display: "flex", gap: 16, flexFlow: "wrap" }}>
        <Input
          label="账号"
          placeholder="请输入"
          size={"large"}
          suffixIcon={<Icon icon="user" />}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />

        <Input
          disabled
          placeholder="请输入"
          label="密码"
          defaultValue={"Hello World! 123~"}
          size={"middle"}
          suffixIcon="eye"
        />

        <Input
          placeholder="请输入"
          label="二次密码"
          defaultValue={"Hello World! 123~"}
          size={"small"}
          suffixIcon="eye-slash"
        />

        <Input.Password
          placeholder="请输入"
          label="密码类型"
          defaultValue={"Hello World! 123~"}
          size={"large"}
          disabled={false}
        />
      </div>
    </>
  );
};

export default ExInput;
