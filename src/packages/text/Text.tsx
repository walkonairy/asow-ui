import React, { forwardRef, ReactNode } from "react";
import { getPrefixCls } from "@/utils";
import classNames from "classnames";
import { Token, useSize } from "@/hooks/useSize";

type TextTag =
  | "ta-1"
  | "ta-2"
  | "ta-3"
  | "ta-4"
  | "ta-5"
  | "ta-6"
  | "tb-1"
  | "tb-2"
  | "tb-3"
  | "tb-4"
  | "tb-5"
  | "tb-6"
  | "tc-1"
  | "tc-2"
  | "tc-3"
  | "tc-4"
  | "tc-5"
  | "tc-6"
  | "ha-1"
  | "ha-2"
  | "ha-3"
  | "ha-4"
  | "ha-5"
  | "ha-6"
  | "ha-7"
  | "hb-1"
  | "hb-2"
  | "hb-3"
  | "hb-4"
  | "hb-5"
  | "hb-6"
  | "hb-7"
  | "hc-1"
  | "hc-2"
  | "hc-3"
  | "hc-4"
  | "hc-5"
  | "hc-6"
  | "hc-7"
  | "default";

export type TextProps<T extends keyof JSX.IntrinsicElements = "p"> = {
  as?: T;
  children: ReactNode;
  tag?: Token<TextTag>;
} & JSX.IntrinsicElements[T];

const Text = <T extends keyof JSX.IntrinsicElements = "p">(
  props: TextProps<T>
) => {
  const {
    // @ts-ignore
    as: Element = "p",
    tag = "default",
    children,
    style,
    className,
    ...rest
  } = props;

  const prefixCls: string = getPrefixCls("text");

  const _tag = useSize<TextTag>(tag);

  let _style = {};

  const _classNames = classNames(
    prefixCls,
    {
      [`${prefixCls}-${_tag}`]: _tag,
    },
    className
  );

  return React.createElement(
    Element,
    {
      ...rest,
      className: _classNames,
      style: { ..._style, ...style },
    },
    children
  );
};

export default Text;
