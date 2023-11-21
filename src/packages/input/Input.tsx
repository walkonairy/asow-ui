import React, {
  useRef,
  CSSProperties,
  forwardRef,
  InputHTMLAttributes,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { getPrefixCls, Size, str2size } from "@/utils";
import { Token, useSize } from "@/hooks/useSize";
import classNames from "classnames";
import { useOnClickOutside } from "@/hooks/useOnclickOutSide";

// size：sm、md、lg 🌟
// type：outline、unstyled 🌟
// hover、focus 动画 🌟
// disabled 🌟
// error 🌟
// 前缀（prefix）、后缀（suffix）🌟
// TextArea、Password
// allow clear 🌟
// 输入数量  1 / 30 🌟
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
  suffixIcon?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
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
      maxLength,
      ...rest
    } = props;

    const _size = useSize<Size>(size);

    const _ref = ref || useRef<HTMLInputElement>(null);
    const isInChinese = useRef(false);

    const [_value, setValue] = useState(value || defaultValue);

    useEffect(() => {
      setValue(value || defaultValue);
    }, [value, defaultValue]);

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
      return (
        <span
          // @ts-ignore
          disabled={disabled}
          className={suffixClassNames}
          onClick={onClickInside}
        >
          {hasClearIcon && clearIcon}
          {suffixIcon}
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

      return (
        <div className={messageClassNames}>
          <span>{message}</span>
          {maxLength && (
            <span>
              {_value?.length || 0} / {maxLength}
            </span>
          )}
        </div>
      );
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

    const fixEmojiLength = (value: string, maxLength: number) => {
      return [...(value || "")].slice(0, maxLength).join("");
    };

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      let input = e.target.value;
      // 在输入非中文的情况下，截取允许最大输入
      if (!isInChinese.current) {
        setLimitLenInput(input);
        // return;
      }
      // 需要触发onChange才会触发onCompositionEnd
      setValue(input);
      onChange?.(e);
    }

    // 当用户使用拼音输入法开始输入汉字触发
    function handleCompositionStart() {
      isInChinese.current = true;
    }

    // 当用户使用拼音输入法输入汉字或者使用语音输入完毕或者取消时触发
    function handleCompositionEnd(e: any) {
      isInChinese.current = false;
      const input = e.target.value;
      setLimitLenInput(input);
    }

    function setLimitLenInput(input: string) {
      const oldInputSelectionPos = _ref.current?.selectionStart;
      const result = fixEmojiLength(input, maxLength);
      setValue(result);
      setTimeout(() => {
        setLimitLenInputSelectionPos(oldInputSelectionPos);
      });
    }

    function setLimitLenInputSelectionPos(oldInputSelectionPos: any) {
      const currentInputSelectionPos = _ref.current?.selectionStart;
      if (!oldInputSelectionPos || !currentInputSelectionPos) {
        return;
      }
      if (oldInputSelectionPos <= currentInputSelectionPos) {
        _ref.current!.setSelectionRange(
          oldInputSelectionPos,
          oldInputSelectionPos
        );
        return;
      }
    }

    const handleClearClick = () => {
      if (disabled) return;
      setValue("");
      _ref.current.focus();
    };

    const hasClearIcon = allowClear && _value?.length > 0;
    const clearIcon = (
      <IoCloseCircleOutline
        size="20px"
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
                maxLength={maxLength}
                onChange={handleChange}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
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
