import React, { forwardRef, InputHTMLAttributes } from "react";
import { getPrefixCls, Size, str2size } from "@/utils";
import { Token, useSize } from "@/hooks/useSize";
import classNames from "classnames";

// size：sm、md、lg
// type：outline、unstyled
// hover、focus 动画
// disabled
// error
// 前缀（prefix）、后缀（suffix）
// TextArea、Password
// allow clear
// 输入数量  1 / 30
// autocomplete、远程搜索

export type InputType = "unstyled" | "outline";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: Token<Size>;
  type?: InputType;
  hasError?: boolean;
  className?: string;
  disabled?: boolean;
  label?: string;
  allowClear?: boolean;
}

const Input = forwardRef(
  (props: InputProps, ref: React.RefObject<HTMLInputElement>) => {
    const {
      value,
      defaultValue,
      size = "middle",
      type = "outline",
      hasError = false,
      disabled = false,
      label,
      className,
      onChange,
      ...rest
    } = props;
    const prefixCls: string = getPrefixCls("input");

    const _size = useSize<Size>(size);

    const _classNames = classNames(
      prefixCls,
      {
        [`${prefixCls}-${str2size(_size)}`]: _size,
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-status-error`]: hasError,
      },
      className
    );

    return (
      <>
        <input
          ref={ref}
          defaultValue={defaultValue}
          disabled={disabled}
          className={_classNames}
          {...rest}
        />
      </>
    );
  }
);

export default Input;
