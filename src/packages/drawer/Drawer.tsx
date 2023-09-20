import React, { CSSProperties, useRef } from "react";
import Portal from "@/packages/portal";
import { CSSTransition } from "react-transition-group";
import { getPrefixCls } from "@/utils";
import classNames from "classnames";
import { useOnClickOutside } from "@/hooks/useOnclickOutSide";
import { useRollbackOverflow } from "@/hooks/useRollbackOverflow";
import { usePressEsc } from "@/hooks/usePressEsc";
import { useTimeoutState } from "@/hooks/useTimeoutState";

export interface DrawerProps {
  title?: string;
  isOpen: boolean;
  onClose?: () => void;
  width?: string;
  height?: string;
  placement?: "top" | "right" | "bottom" | "left";
  mask?: boolean;
  maskStyle?: CSSProperties;
  maskClosable?: boolean;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const {
    isOpen,
    placement = "right",
    width = 375,
    height = 375,
    mask,
    maskStyle,
    maskClosable,
    onClose,
    children,
  } = props;

  const prefixCls: string = getPrefixCls("drawer");

  const maskClassNames = classNames(`${prefixCls}-mask-fade`);
  const wrapClassNames = classNames(
    `${prefixCls}-anm`,
    `${prefixCls}-${placement}-wrap`
  );
  const contentClassNames = classNames(`${prefixCls}-content`);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [modalOpen] = useTimeoutState(isOpen);

  useRollbackOverflow(isOpen);

  usePressEsc(isOpen, () => onClose?.());

  useOnClickOutside(() => {
    if (maskClosable && modalOpen) {
      onClose?.();
    }
  }, wrapperRef);

  const computeW_H = () => {
    let sty_w_h;
    if (placement === "top" || placement === "bottom") {
      sty_w_h = { height };
    } else {
      sty_w_h = { width };
    }
    return sty_w_h;
  };

  return (
    <Portal>
      <div className={prefixCls}>
        {mask && (
          <CSSTransition
            in={modalOpen}
            timeout={300}
            classNames={maskClassNames}
            unmountOnExit
          >
            <div style={maskStyle} />
          </CSSTransition>
        )}
        <CSSTransition
          in={modalOpen}
          timeout={modalOpen ? 10 : 300}
          classNames={`${prefixCls}-applied ${prefixCls}-${placement}-fade`}
          unmountOnExit={false}
        >
          <div className={wrapClassNames} style={computeW_H()} ref={wrapperRef}>
            <div className={contentClassNames}>{children}</div>
          </div>
        </CSSTransition>
      </div>
    </Portal>
  );
};

export default Drawer;
