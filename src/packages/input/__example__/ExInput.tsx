import React from "react";
import { IoCloudyOutline, IoCartSharp } from "react-icons/io5";
import Input from "@/packages/input";
import { Size } from "@asow/ui/dist/utils";

const ExInput = () => {
  const [value, setValue] = React.useState("");

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 16,
          flexFlow: "wrap",
          alignItems: "baseline",
        }}
      >
        <Input
          label="账号"
          placeholder="请输入"
          size={{ base: "small", md: "large" }}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          allowClear={true}
          toolTip="*账号只能是字母加数字的组合"
          maxLength={20}
        />

        <Input
          disabled
          placeholder="请输入"
          label="密码"
          defaultValue={"Hello World! 123~"}
          size={"middle"}
          suffixIcon={<IoCloudyOutline size="22px" />}
          allowClear={true}
        />

        <Input
          placeholder="请输入"
          label="二次密码"
          defaultValue={"Hello World! 123~"}
          size={"small"}
          suffixIcon="icon"
        />

        <Input.Password
          placeholder="请输入"
          label="密码类型"
          defaultValue={"Hello World! 123~"}
          size={"large"}
          disabled={false}
          allowClear={true}
        />

        {["large", "middle", "small"].map((size: Size) => (
          <Input
            id={size}
            placeholder="请输入"
            label="错误 Error"
            defaultValue={"Hello World! 123~"}
            size={size}
            suffixIcon={<IoCartSharp size="20px" />}
            hasError={true}
            allowClear={true}
            toolTip="Tool tip message"
          />
        ))}
      </div>
    </>
  );
};

export default ExInput;
