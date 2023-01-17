import React, { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TriggerProps {
  wrapperId?: string;
  triggerRef?: React.RefObject<HTMLDivElement>;
  triggeredRef?: React.RefObject<HTMLDivElement>;
  isOpen?: boolean;
  children?: React.ReactNode;
}

const Trigger: React.FC<TriggerProps> = (props) => {
  const {
    children,
    wrapperId = "asow_portal",
    triggerRef,
    triggeredRef,
    isOpen,
  } = props;
  const [wrapperElement, setWrapperElement] = useState(null);

  function createWrapperAndAppendToBody(wrapperId) {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
  }, [wrapperId]);

  useLayoutEffect(() => {
    // console.log(triggerRef.current.getBoundingClientRect().top);

    if (triggeredRef.current) {
      triggeredRef.current.style.position = "absolute";
      triggeredRef.current.style.top = "36px";
      triggeredRef.current.style.display = isOpen ? "block" : "none";
      setTimeout(() => {
        triggeredRef.current.style.opacity = isOpen ? "1" : "0";
        triggeredRef.current.style.transition = "all .3s";
      });

      // if (!isOpen) {
      //   setTimeout(() => {
      //     triggeredRef.current.style.display = "none";
      //   }, 300);
      // }
    }

    // triggeredRef.current.style.top = "10px";
  }, [isOpen, triggerRef.current, triggeredRef.current]);

  // wrapperElement state will be null on the very first render.
  if (
    wrapperElement === null
    // || !isOpen
  )
    return null;

  return createPortal(children, wrapperElement);
};

export default Trigger;
