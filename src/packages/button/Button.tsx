import React, { forwardRef } from "react";
import classNames from "classnames";

import { getPrefixCls } from "@/utils/prefixCls";
import { Token, useSize } from "@/hooks/useSize";
import { Size, str2size } from "@/utils";
import LoadingIcon from "@/packages/button/LoadingIcon";

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
  icon?: React.ReactNode;
  children: React.ReactNode;
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
    href,
    icon,
    ...rest
  } = props;

  const prefixCls: string = getPrefixCls("btn");

  const _type = useSize(type);
  const _size = useSize(size);
  const innerLoading = !!loading;

  const _classNames = classNames(
    prefixCls,
    {
      [`${prefixCls}-${_type}`]: _type,
      [`${prefixCls}-${str2size(_size)}`]: _size,
      [`${prefixCls}-${type}-danger`]: type && danger,
      [`${prefixCls}-loading`]: innerLoading,
    },
    className
  );

  const iconNode =
    icon && !innerLoading ? (
      <span style={{ marginRight: 8 }}>{icon}</span>
    ) : (
      <LoadingIcon loading={innerLoading} />
    );

  const handleClick = (e) => {
    const { onClick } = props;
    if (innerLoading) {
      return;
    }
    onClick?.(e);
  };

  if (type === "link" && href) {
    return (
      <a href={href} className={_classNames} onClick={handleClick} {...rest}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {iconNode}
          {children}
        </div>
      </a>
    );
  }

  return (
    <button
      {...(rest as NativeButtonProps)}
      className={_classNames}
      type={htmlType}
      ref={ref}
      disabled={disabled}
      onClick={handleClick}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {iconNode}
        {children}
      </div>
    </button>
  );
});

export default Button;
