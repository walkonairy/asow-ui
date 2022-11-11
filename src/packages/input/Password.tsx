import React, { forwardRef } from "react";
import Input, { InputProps } from "@/packages/input/Input";

export interface PasswordProps extends InputProps {
  visibilityToggle?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
}

const Password = forwardRef(
  (props: PasswordProps, ref: React.RefObject<HTMLInputElement>) => {
    const { visibilityToggle, ...rest } = props;

    const renderPassword = () => {
      const omittedProps: InputProps = { ...rest };
      return <Input ref={ref} {...omittedProps} />;
    };

    return <>{renderPassword()}</>;
  }
);

export default Password;
