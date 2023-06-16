import React, { forwardRef, useRef } from "react";
import Trigger from "@/packages/trigger";
import { Mask } from "./styles/Modal.style";

interface ModalProps {
  title?: string;
  isOpen?: boolean;
  onClose: () => void;
  customize?: boolean;
  mask?: boolean;
  children: React.ReactNode;
}
const Modal = forwardRef((props: ModalProps, ref: React.RefObject<any>) => {
  const { isOpen, title, onClose, customize, mask, children } = props;

  const triggerRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef<HTMLDivElement>(null);

  const renderParent = (children) => {
    return <Mask show={mask && isOpen}>{children}</Mask>;
  };

  return (
    <>
      <div ref={triggerRef} onClick={onClose} style={{ display: "none" }} />
      <Trigger
        type="modal"
        isOpen={isOpen}
        triggerRef={triggerRef}
        triggeredRef={triggeredRef}
        renderParent={renderParent}
      >
        <div ref={triggeredRef}>
          {customize ? children : <div>{title}</div>}
        </div>
      </Trigger>
    </>
  );
});

export default Modal;
