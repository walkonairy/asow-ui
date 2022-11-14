import React from "react";
import Input from "@/packages/input";

const ExInput = () => {
  const [value, setValue] = React.useState("");

  return (
    <div style={{ display: "flex", gap: 16, flexFlow: "wrap" }}>
      <Input
        label="账号"
        defaultValue={"Hello World! 123~"}
        placeholder="请输入"
        size={"large"}
        suffixIcon="eyedropper"
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
        onChange={() => {
          console.log(value);
        }}
      />

      <Input
        placeholder="请输入"
        label="二次密码"
        defaultValue={"Hello World! 123~"}
        size={"small"}
        suffixIcon="eye-slash"
      />
    </div>
  );
};

export default ExInput;
