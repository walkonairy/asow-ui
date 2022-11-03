import React, { forwardRef } from "react";
import classNames from "classnames";

import { getPrefixCls } from "@/utils/prefixCls";
// import "./button.css";
import "./styles/_index.scss";
import { ResponsiveObj, Token, useSize } from "@/hooks/useSize";
import { Box } from "@chakra-ui/react";

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

  const re_size = useSize({ base: "red", md: "#333", lg: "#666" });
  console.log(re_size);

  return (
    <>
      <Box w={{ base: "123" }} />
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
