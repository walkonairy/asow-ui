import React, { forwardRef, MouseEvent } from "react";

import { useMediaQuery } from "@chakra-ui/react";

import {
  InputWrapper,
  InputBox,
  InputContent,
  InputLabel,
  _Input,
  InputIcon,
  InputBorder,
  InputErrorMessage,
} from "./Input.styled";
import "./input.css";
import { theme } from "../../theme";

export interface BaseInputProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  suffixIcon?: React.ReactNode;
  onClickSuffixIcon?: (e: MouseEvent<HTMLDivElement>) => void;
  errorMessage?: string;
}

const Input = forwardRef((props: BaseInputProps, ref: React.RefObject<any>) => {
  const {
    id,
    label = "",
    suffixIcon = "",
    onClickSuffixIcon,
    errorMessage = "",
    ...rest
  } = props;

  const [lessThanEqual640] = useMediaQuery(
    `(max-width: ${theme.breakpoints.md})`
  );

  const _onClickSuffixIcon = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClickSuffixIcon && onClickSuffixIcon(e);
  };

  return (
    <React.Fragment>
      <div>
        <InputWrapper>
          <InputBorder error={!!errorMessage}>
            <InputBox>
              <InputContent>
                {label && (
                  <InputLabel
                    htmlFor={id || label || "input-label"}
                    error={!!errorMessage}
                  >
                    {label}
                  </InputLabel>
                )}
                <_Input
                  id={id || label || "input-label"}
                  placeholder={lessThanEqual640 ? label : ""}
                  {...rest}
                  ref={ref}
                />
              </InputContent>
              {suffixIcon && (
                <InputIcon onClick={_onClickSuffixIcon}>{suffixIcon}</InputIcon>
              )}
            </InputBox>
          </InputBorder>
        </InputWrapper>
        {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      </div>
    </React.Fragment>
  );
});

export default Input;
