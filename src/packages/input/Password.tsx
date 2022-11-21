import React, { forwardRef, useState } from "react";
import Input, { InputProps } from "@/packages/input/Input";
import { Icon } from "@/index";

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

    const icon = visible ? "eye" : "eye-slash";

    const suffixNode = (
      <Icon
        icon={icon}
        onClick={onVisibleChange}
        style={{ cursor: props.disabled ? "not-allowed" : "pointer" }}
      />
    );

    const renderPassword = () => {
      const omittedProps: InputProps = {
        ...rest,
        type: visible ? "text" : "password",
        suffixIcon: suffixNode,
      };
      return <Input ref={ref} {...omittedProps} />;
    };

    return <>{renderPassword()}</>;
  }
);

export default Password;
