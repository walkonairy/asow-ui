import React from "react";
import Input from "@/packages/input";

const ExInput = () => {
  return (
    <>
      <div style={{ display: "flex", gap: 16, flexFlow: "wrap" }}>
        <Input defaultValue={"Hello World! 123~"} size={"small"} />
        <Input defaultValue={"Hello World! 123~"} size={"middle"} />
        <Input defaultValue={"Hello World! 123~"} size={"large"} />
        <Input
          defaultValue={"Hello World! 123~"}
          type={"unstyled"}
          size={"large"}
        />
        <Input defaultValue={"Hello World! 123~"} size={"large"} hasError />
        <Input defaultValue={"Hello World! 123~"} size={"large"} disabled />
        <Input.Password visibilityToggle={true} />
        <Input.TextArea allowClear={true} />
      </div>
    </>
  );
};

export default ExInput;
