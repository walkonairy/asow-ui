import React, {
  useRef,
  CSSProperties,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import { getPrefixCls, Size, str2size } from "@/utils";
import { Token, useSize } from "@/hooks/useSize";
import { Icon, IconProps } from "@/index";
import classNames from "classnames";

// size：sm、md、lg 🌟
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
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  disabled?: boolean;
  label?: string;
  allowClear?: boolean;
  suffixIcon?: IconProps["icon"];
}

const Input = forwardRef(
  (props: InputProps, ref: React.RefObject<HTMLInputElement>) => {
    const {
      id,
      defaultValue,
      size = "middle",
      type = "outline",
      hasError = false,
      disabled = false,
      label,
      className,
      wrapperClassName,
      wrapperStyle,
      suffixIcon,
      ...rest
    } = props;

    const _size = useSize<Size>(size);

    const wrapperCls: string = getPrefixCls("input-wrapper");
    const wrapperClassNames = classNames(
      wrapperCls,
      {
        [`${wrapperCls}-status-error`]: hasError,
        [`${wrapperCls}-${str2size(_size)}`]: _size,
      },
      wrapperClassName
    );

    const inputCls: string = getPrefixCls("input");
    const inputClassNames = classNames(
      inputCls,
      {
        [`${inputCls}-${str2size(_size)}`]: _size,
        [`${inputCls}-${type}`]: type,
        [`${inputCls}-status-error`]: hasError,
      },
      className
    );

    const renderLabel = () => {
      if (!label) {
        return;
      }
      return (
        <label
          // @ts-ignore
          disabled={disabled}
          htmlFor={id || label || "input-label"}
          className={`${inputCls}-label ${inputCls}-label-${str2size(_size)}`}
        >
          {label}
        </label>
      );
    };

    return (
      <>
        <div>
          {size === "small" && renderLabel()}
          <div
            // @ts-ignore
            disabled={disabled}
            className={wrapperClassNames}
            style={wrapperStyle}
          >
            <div className={`${wrapperCls}-box`}>
              <div className={`${wrapperCls}-content`}>
                {size !== "small" && renderLabel()}
                <input
                  id={id || label || "input-label"}
                  ref={ref}
                  defaultValue={defaultValue}
                  disabled={disabled}
                  className={inputClassNames}
                  {...rest}
                />
              </div>
              {suffixIcon && (
                <span
                  // @ts-ignore
                  disabled={disabled}
                  className={`${inputCls}-suffix ${inputCls}-suffix-${str2size(
                    _size
                  )}`}
                >
                  <Icon icon={suffixIcon} />
                </span>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Input;
