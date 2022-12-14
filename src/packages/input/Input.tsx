import React, {
  useRef,
  CSSProperties,
  forwardRef,
  InputHTMLAttributes,
  ChangeEvent,
  useState,
} from "react";
import { getPrefixCls, Size, str2size } from "@/utils";
import { Token, useSize } from "@/hooks/useSize";
import { Icon, IconProps } from "@/index";
import classNames from "classnames";
import { useOnClickOutside } from "@/hooks/useOnclickOutSide";

// size：sm、md、lg 🌟
// type：outline、unstyled
// hover、focus 动画 🌟
// disabled 🌟
// error
// 前缀（prefix）、后缀（suffix）🌟
// TextArea、Password
// allow clear 🌟
// 输入数量  1 / 30
// autocomplete、远程搜索

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: Token<Size>;
  className?: string;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  disabled?: boolean;
  label?: string;
  allowClear?: boolean;
  hasError?: boolean | string;
  toolTip?: string;
  suffixIcon?: IconProps["icon"] | React.ReactNode;
  defaultValue?: string;
  value?: string;
}

const Input = forwardRef(
  (props: InputProps, ref: React.RefObject<HTMLInputElement>) => {
    const {
      id,
      defaultValue,
      size = "middle",
      hasError = false,
      disabled = false,
      allowClear = false,
      label,
      className,
      wrapperClassName,
      wrapperStyle,
      suffixIcon,
      toolTip,
      value,
      onChange,
      ...rest
    } = props;

    const _size = useSize<Size>(size);

    const _ref = ref || useRef<HTMLInputElement>(null);
    const [_value, setValue] = useState(defaultValue || value);

    /**
     * Wrapper ClassName
     */
    const wrapperCls: string = getPrefixCls("input-wrapper");
    const wrapperClassNames = classNames(
      wrapperCls,
      {
        [`${wrapperCls}-${str2size(_size)}`]: _size,
        [`${wrapperCls}-status-error`]: !!hasError,
      },
      wrapperClassName
    );

    /**
     * Input ClassName
     */
    const inputCls: string = getPrefixCls("input");
    const inputClassNames = classNames(
      inputCls,
      {
        [`${inputCls}-${str2size(_size)}`]: _size,
        [`${inputCls}-status-error`]: !!hasError,
      },
      className
    );

    /**
     * Label ClassName
     */
    const labelClassNames = classNames({
      [`${inputCls}-label`]: true,
      [`${inputCls}-label-${str2size(_size)}`]: _size,
      [`${inputCls}-label-error`]: !!hasError,
    });

    /**
     * Suffix ClassName
     */
    const suffixClassNames = classNames({
      [`${inputCls}-suffix`]: true,
      [`${inputCls}-suffix-${str2size(_size)}`]: _size,
      [`${inputCls}-suffix-error`]: !!hasError,
    });

    /**
     * Label ClassName
     */
    const messageClassNames = classNames({
      [`${inputCls}-message`]: true,
      [`${inputCls}-message-${str2size(_size)}`]: _size,
      [`${inputCls}-message-error`]: !!hasError,
    });

    const renderLabel = () => {
      if (!label) {
        return;
      }
      return (
        <label
          // @ts-ignore
          disabled={disabled}
          htmlFor={id || label || "input-label"}
          className={labelClassNames}
        >
          {label}
        </label>
      );
    };

    const renderSuffix = (suffixIcon) => {
      const _suffix =
        typeof suffixIcon === "object" ? (
          suffixIcon
        ) : (
          <Icon icon={suffixIcon as IconProps["icon"]} />
        );

      return (
        <span
          // @ts-ignore
          disabled={disabled}
          className={suffixClassNames}
        >
          {hasClearIcon && clearIcon}
          {_suffix}
        </span>
      );
    };

    const renderMessage = () => {
      let message;
      const error = typeof hasError === "string" && !!hasError;

      if (error) {
        message = hasError;
      }
      if (toolTip) {
        message = toolTip;
      }
      if (error && toolTip) {
        message = hasError;
      }

      return <span className={messageClassNames}>{message}</span>;
    };

    /**
     * ======= 聚焦按钮时，手动添加样式 =======
     */
    const divRef = useRef<HTMLDivElement>(null);
    const inputFocusCls = !!hasError
      ? `${wrapperCls}-focus-status-error`
      : `${wrapperCls}-focus`;
    useOnClickOutside(() => {
      divRef.current.classList.remove(inputFocusCls);
    }, divRef);
    const onClickInside = () => {
      if (disabled) {
        return;
      }
      divRef.current.classList.add(inputFocusCls);
    };
    /**
     * ====================================
     */

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValue(value);
      onChange?.(event);
    };

    const handleClearClick = () => {
      if (disabled) return;
      setValue("");
      _ref.current.focus();
    };

    const hasClearIcon = allowClear && _value.length > 0;
    const clearIcon = (
      <Icon
        icon="xmark-circle"
        onClick={handleClearClick}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      />
    );

    return (
      <div style={{ width: "100%" }}>
        {_size === "small" && renderLabel()}
        <div
          // @ts-ignore
          disabled={disabled}
          className={wrapperClassNames}
          style={wrapperStyle}
          ref={divRef}
        >
          <span className={`${wrapperCls}-box`}>
            <span className={`${wrapperCls}-content`} onClick={onClickInside}>
              {_size !== "small" && renderLabel()}
              <input
                id={id || label || "input-label"}
                ref={_ref}
                defaultValue={defaultValue}
                disabled={disabled}
                className={inputClassNames}
                value={_value}
                onChange={handleChange}
                {...rest}
              />
            </span>
            {renderSuffix(suffixIcon)}
          </span>
        </div>
        {renderMessage()}
      </div>
    );
  }
);

export default Input;
