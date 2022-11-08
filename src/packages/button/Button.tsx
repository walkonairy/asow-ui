import React, { forwardRef } from "react";
import classNames from "classnames";

import { getPrefixCls } from "@/utils/prefixCls";
import { Token, useSize } from "@/hooks/useSize";
import { Size, str2size } from "@/utils";

export type ButtonType =
  | "default"
  | "primary"
  | "ghost"
  | "dashed"
  | "link"
  | "text";

export type ButtonHTMLType = "submit" | "button" | "reset";

export type ButtonSize = Size;

export interface BaseButtonProps {
  type?: Token<ButtonType>;
  size?: Token<ButtonSize>;
  className?: string;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactElement | string;
}

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, "type">;

export type AnchorButtonProps = {
  href: string;
  target?: string;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, "type">;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button = forwardRef((props: ButtonProps, ref: React.RefObject<any>) => {
  const {
    id,
    children,
    className,
    loading = false,
    disabled = false,
    danger = false,
    type = "default",
    size = "middle",
    htmlType = "button" as ButtonProps["htmlType"],
    ...rest
  } = props;

  const prefixCls: string = getPrefixCls("btn");

  const _type = useSize(type);
  const _size = useSize(size);

  const _classNames = classNames(
    prefixCls,
    {
      [`${prefixCls}-${_type}`]: _type,
      [`${prefixCls}-${str2size(_size)}`]: _size,
      [`${prefixCls}-${type}-danger`]: type && danger,
    },
    className
  );

  return (
    <>
      <button
        {...(rest as NativeButtonProps)}
        className={_classNames}
        type={htmlType}
        ref={ref}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
});

export default Button;
