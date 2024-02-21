import React, { CSSProperties, useRef } from "react";
import { Button } from "@/index";
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
  title?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  unmountOnClose?: boolean;
  customize?: boolean;
  mask?: boolean;
  width?: string | number;
  maskStyle?: CSSProperties;
  onClose?: () => void;
  maskClosable?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    title,
    cancelText,
    confirmText,
    mask,
    width,
    maskStyle,
    maskClosable,
    customize,
    children,
    unmountOnClose,
    onClose,
    onCancel,
    onConfirm,
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

  /**
   * ================= render footer start =================
   */
  const renderDefaultFooter = () => {
    if (cancelText && confirmText) {
      return (
        <>
          {renderCancelBtn()} {renderConfirmBtn(confirmText, onConfirm)}
        </>
      );
    }
    if (!cancelText && confirmText) {
      return renderConfirmBtn(confirmText, onConfirm);
    }
    if (cancelText && !confirmText) {
      return renderConfirmBtn(cancelText, onCancel);
    }
  };

  const renderCancelBtn = () => {
    return (
      <Button
        size={"large"}
        style={{ background: "#191f1f", color: "#fff" }}
        onClick={() => {
          onCancel ? onCancel() : onClose();
        }}
      >
        {cancelText}
      </Button>
    );
  };

  const renderConfirmBtn = (text, onClick) => {
    return (
      <Button
        size={"large"}
        style={{ background: "#5b9ddb", color: "#fff" }}
        onClick={onClick}
      >
        {text}
      </Button>
    );
  };
  /**
   * ================= render footer end =================
   */

  const renderDefault = () => {
    return (
      <div className={wrapClassNames}>
        <div className={contentClassNames} style={{ width }} ref={wrapperRef}>
          <div className={`${prefixCls}-body`} style={{ width }}>
            {title && <div className={`${prefixCls}-body-title`}>{title}</div>}
            <div className={`${prefixCls}-body-content`}>{children}</div>
            {(cancelText || confirmText) && (
              <div className={`${prefixCls}-body-footer`}>
                {renderDefaultFooter()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCustomize = () => {
    return (
      <div className={wrapClassNames}>
        <div className={contentClassNames} ref={wrapperRef}>
          {children}
        </div>
      </div>
    );
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
          timeout={300}
          classNames={`${prefixCls}-applied ${prefixCls}-fade`}
          unmountOnExit={unmountOnClose}
        >
          {customize ? renderCustomize() : renderDefault()}
        </CSSTransition>
      </div>
    </Portal>
  );
};

export default Modal;
