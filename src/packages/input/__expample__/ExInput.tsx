import React from "react";
import Input from "@/packages/input";

const ExInput = () => {
  return (
    <>
      <div style={{ display: "flex", gap: 16, flexFlow: "wrap" }}>
        <Input value={"Hello World! 123~"} size={"small"} />
        <Input value={"Hello World! 123~"} size={"middle"} />
        <Input value={"Hello World! 123~"} size={"large"} />
        <Input value={"Hello World! 123~"} type={"unstyled"} size={"large"} />
        <Input value={"Hello World! 123~"} size={"large"} hasError />
        <Input value={"Hello World! 123~"} size={"large"} disabled />
      </div>
    </>
  );
};

export default ExInput;
