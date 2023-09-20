import React, { CSSProperties, useRef } from "react";
import { getPrefixCls } from "@/utils";
import classNames from "classnames";
import Portal from "@/packages/portal";
import { CSSTransition } from "react-transition-group";
import { usePressEsc } from "@/hooks/usePressEsc";
import { useRollbackOverflow } from "@/hooks/useRollbackOverflow";
import { useOnClickOutside } from "@/hooks/useOnclickOutSide";
import { useTimeoutState } from "@/hooks/useTimeoutState";

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  unmountOnClose?: boolean;
  customize?: boolean;
  mask?: boolean;
  maskStyle?: CSSProperties;
  maskClosable?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    mask,
    maskStyle,
    maskClosable,
    onClose,
    customize,
    children,
    unmountOnClose,
  } = props;

  const prefixCls: string = getPrefixCls("modal");

  const maskClassNames = classNames(`${prefixCls}-mask-fade`);
  const wrapClassNames = classNames(`${prefixCls}-anm`, `${prefixCls}-wrap`);
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
          timeout={300}
          classNames={`${prefixCls}-applied ${prefixCls}-fade`}
          unmountOnExit={unmountOnClose}
        >
          <div className={wrapClassNames}>
            <div className={contentClassNames} ref={wrapperRef}>
              {children}
            </div>
          </div>
        </CSSTransition>
      </div>
    </Portal>
  );
};

export default Modal;
