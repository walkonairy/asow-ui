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

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: Token<Size>;
  type?: InputType;
  hasError?: boolean;
  className?: string;
  disabled?: boolean;
}

export interface SearchProps extends BaseInputProps {
  //
}

export interface PasswordProps extends BaseInputProps {
  //
}

export interface AreaProps extends BaseInputProps {
  //
}

const Input = forwardRef((props: BaseInputProps, ref: React.RefObject<any>) => {
  const {
    value,
    size = "middle",
    type = "outline",
    hasError = false,
    disabled = false,
    className,
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
        disabled={disabled}
        value={value}
        className={_classNames}
        {...rest}
      />
    </>
  );
});

export default Input;
