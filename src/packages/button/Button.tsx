import React, {
  AnchorHTMLAttributes,
  forwardRef,
  MouseEventHandler,
  useEffect,
} from "react";
import { Box, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

import "./button.css";

export type AnchorButtonProps = {
  href?: string;
  target?: string;
  onClick?: MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  // 去除AnchorHTMLAttributes<any>中的type和onClick
  Omit<AnchorHTMLAttributes<any>, "type" | "onClick">;

export interface BaseButtonProps extends ChakraButtonProps {
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactElement;
}

export type ButtonProps = Partial<AnchorButtonProps>;

const btnWrapperId = `btn-${Math.random().toString(36).slice(-8)}`;
const loadingWrapperId = `btn-loading-${Math.random().toString(36).slice(-8)}`;

const Button = forwardRef((props: ButtonProps, ref: React.RefObject<any>) => {
  const { children, id, loading = false, disabled = false, ...rest } = props;
  const _btnWrapperId = id || btnWrapperId;

  useEffect(() => {
    const loadingWrapperElements = document.getElementById(loadingWrapperId);

    if (loading) {
      loadingWrapperElements.classList.add("btn-loading-start");
      for (let i = 0; i < loadingWrapperElements.children.length; i++) {
        loadingWrapperElements.children[i].classList.add("btn-loading-dot");
      }
    } else {
      loadingWrapperElements?.classList?.remove("btn-loading-start");
      for (let i = 0; i < loadingWrapperElements?.children?.length; i++) {
        loadingWrapperElements.children[i].classList.remove("btn-loading-dot");
      }
    }
  }, [loading]);

  return (
    <Box
      as="button"
      id={_btnWrapperId}
      className="btn-button"
      ref={ref}
      disabled={disabled}
      _hover={{
        filter: disabled ? "unset" : "brightness(1.2)",
        transition: "all .3s",
      }}
      {...rest}
    >
      <div className="btn-content">
        <div>{children}</div>
        {loading && (
          <div id={loadingWrapperId} className="btn-loading-wrapper">
            <div className="bounce1" />
            <div className="bounce2" />
            <div />
          </div>
        )}
      </div>
    </Box>
  );
});

export default Button;
