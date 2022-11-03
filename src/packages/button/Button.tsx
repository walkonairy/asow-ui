import React, { forwardRef } from "react";
import classNames from "classnames";

import { getPrefixCls } from "@/utils/prefixCls";
import { ResponsiveObj } from "@/hooks/useSize";
import "./styles/_index.scss";

export type ButtonType =
  | "default"
  | "primary"
  | "ghost"
  | "dashed"
  | "link"
  | "text";

export type ButtonHTMLType = "submit" | "button" | "reset";

export interface BaseButtonProps {
  type?: ButtonType | ResponsiveObj<ButtonType>;
  className?: string;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactElement | string;
}

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, "type" | "onClick">;

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, "type" | "onClick">;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button = forwardRef((props: ButtonProps, ref: React.RefObject<any>) => {
  const {
    children,
    id,
    loading = false,
    disabled = false,
    className,
    htmlType = "button" as ButtonProps["htmlType"],
    ...rest
  } = props;

  const prefixCls: string = getPrefixCls("btn");
  const _classNames = classNames(prefixCls, {}, className);

  return (
    <>
      <button
        {...(rest as NativeButtonProps)}
        className={_classNames}
        type={htmlType}
        ref={ref}
        disabled={disabled}
      >
        <div>{children}</div>
      </button>
    </>
  );
});

export default Button;
