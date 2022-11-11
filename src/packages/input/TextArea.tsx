import React, { forwardRef } from "react";
import Input, { InputProps } from "@/packages/input/Input";

export interface TextAreaProps extends InputProps {
  allowClear?: boolean;
}

const TextArea = forwardRef(
  (props: TextAreaProps, ref: React.RefObject<HTMLInputElement>) => {
    const { allowClear, ...rest } = props;

    const renderTextArea = () => {
      const omittedProps: InputProps = { ...rest };
      return <Input ref={ref} {...omittedProps} />;
    };

    return <>{renderTextArea()}</>;
  }
);

export default TextArea;
