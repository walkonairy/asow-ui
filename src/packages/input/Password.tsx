import React, { forwardRef, useState } from "react";
import Input, { InputProps } from "@/packages/input/Input";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

type VisibilityToggle = {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
};

export interface PasswordProps extends InputProps {
  visibilityToggle?: boolean | VisibilityToggle;
}

const Password = forwardRef(
  (props: PasswordProps, ref: React.RefObject<HTMLInputElement>) => {
    const { visibilityToggle = true, ...rest } = props;

    const visibilityControlled =
      typeof visibilityToggle === "object" &&
      visibilityToggle.visible !== undefined;

    const [visible, setVisible] = useState(() =>
      visibilityControlled ? visibilityToggle.visible! : false
    );

    const onVisibleChange = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { disabled } = props;
      if (disabled) {
        return;
      }
      setVisible((pre) => {
        if (typeof visibilityToggle === "object") {
          visibilityToggle.onVisibleChange?.(!pre);
        }
        return !pre;
      });
    };

    const getIcon = (visible) => {
      const Icon = visible ? IoEyeOutline : IoEyeOffOutline;
      return (
        <Icon
          size="20px"
          onClick={onVisibleChange}
          style={{ cursor: props.disabled ? "not-allowed" : "pointer" }}
        />
      );
    };

    const suffixNode = getIcon(visible);

    const renderPassword = () => {
      const omittedProps: InputProps = {
        ...rest,
        type: visible ? "text" : "password",
        suffixIcon: suffixNode,
        size: "large",
      };
      return <Input ref={ref} {...omittedProps} />;
    };

    return <>{renderPassword()}</>;
  }
);

export default Password;
