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
  const delayMs = 200;

  function createWrapperAndAppendToBody(wrapperId) {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

  useEffect(() => {
    let element = document.getElementById(wrapperId);
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
  }, [wrapperId]);

  useLayoutEffect(() => {
    computePosition();
  }, [isOpen, triggerRef.current, triggeredRef.current]);

  const computePosition = () => {
    if (!triggerRef.current || !triggeredRef.current) {
      return;
    }
    const rect = triggerRef.current.getBoundingClientRect();
    let documentH = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    triggeredRef.current.style.position = "absolute";
    triggeredRef.current.style.opacity = "0";
    triggeredRef.current.style.display = "block";

    setTimeout(() => {
      let height = triggeredRef.current?.getBoundingClientRect().height || 0;

      if (height > documentH - rect.height - rect.y) {
        triggeredRef.current.style.top = rect.y - height + scrollTop + "px";
      } else {
        triggeredRef.current.style.top =
          rect.y + rect.height + scrollTop + "px";
      }

      triggeredRef.current.style.opacity = isOpen ? "1" : "0";
      triggeredRef.current.style.transition = `opacity ${delayMs}ms`;
    });

    setTimeout(() => {
      triggeredRef.current.style.display = !isOpen && "none";
    }, delayMs);
  };

  // wrapperElement state will be null on the very first render.
  if (
    wrapperElement === null
    // || !isOpen
  )
    return null;

  return createPortal(children, wrapperElement);
};

export default Trigger;
