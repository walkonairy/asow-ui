import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { getPrefixCls } from "@/utils";
import classNames from "classnames";
import Portal from "@/packages/portal";
import { CSSTransition } from "react-transition-group";

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  unmountOnClose?: boolean;
  customize?: boolean;
  mask?: boolean;
  maskStyle?: CSSProperties;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    mask,
    maskStyle,
    onClose,
    customize,
    children,
    unmountOnClose,
  } = props;

  const prefixCls: string = getPrefixCls("modal");

  const maskClassNames = classNames(`${prefixCls}-mask-fade`);
  const wrapClassNames = classNames(`${prefixCls}-anm`, `${prefixCls}-wrap`);
  const contentClassNames = classNames(`${prefixCls}-content`);

  const overflowRef = useRef("");
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * 避免isOpen初始值为true时没有弹出modal
   */
  useEffect(() => {
    setTimeout(() => {
      setModalOpen(isOpen);
    });
  }, [isOpen]);

  /**
   * 缓存原始的overflow属性值
   */
  useEffect(() => {
    overflowRef.current = document.body.style.overflow;
  }, []);

  /**
   * 当打开modal时禁止滚动屏幕，关闭时恢复至缓存值
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = overflowRef.current;
    }
  }, [isOpen]);

  /**
   * 键盘Esc关闭modal
   */
  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <Portal>
      <div>
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
            <div className={contentClassNames}>{children}</div>
          </div>
        </CSSTransition>
      </div>
    </Portal>
  );
};

export default Modal;
