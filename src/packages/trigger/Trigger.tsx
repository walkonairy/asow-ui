import React, { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const getMaxIndex = () => {
  const bodyElement = [...document.body.querySelectorAll("*")];
  const indexArr: any = [];
  for (let item of bodyElement) {
    indexArr.push(Number(window.getComputedStyle(item).zIndex) || 0);
  }
  return String(Math.max(...indexArr) + 1);
};

interface TriggerProps {
  wrapperId?: string;
  triggerRef?: React.RefObject<HTMLDivElement>;
  triggeredRef?: React.RefObject<HTMLDivElement>;
  isOpen?: boolean;
  type?: "calendar" | "modal";
  renderParent?: (children) => React.ReactElement;
  children?: React.ReactNode;
}

const Trigger: React.FC<TriggerProps> = (props) => {
  const {
    children,
    wrapperId = "asow_portal",
    type = "calendar",
    triggerRef,
    triggeredRef,
    isOpen,
    renderParent,
  } = props;
  const [wrapperElement, setWrapperElement] = useState(null);

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
    console.log(triggeredRef.current);
    computePosition();
  }, [isOpen, triggerRef.current, triggeredRef.current]);

  const computePosition = () => {
    if (!triggerRef.current || !triggeredRef.current) {
      return;
    }

    const triggeredElem = triggeredRef.current;

    const documentH = document.documentElement.clientHeight;
    const documentW = document.documentElement.clientWidth;

    const height = triggeredElem.getBoundingClientRect().height || 0;
    const width = triggeredElem.getBoundingClientRect().width || 0;

    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollLeft =
      document.documentElement.scrollLeft || document.body.scrollLeft || 0;

    triggeredElem.classList.add("triggered-element");

    if (type === "calendar") {
      const rect = triggerRef.current.getBoundingClientRect();
      triggeredElem.style.display = isOpen ? "block" : "none";
      triggeredElem.style.zIndex = getMaxIndex();
      triggeredElem.style.opacity = isOpen ? "1" : "0";
      triggeredElem.style.top =
        height > documentH - rect.height - rect.y
          ? rect.y - height + scrollTop + "px"
          : rect.y + rect.height + scrollTop + "px";
      triggeredElem.style.left =
        width > documentW - rect.width - rect.x - 10
          ? rect.x + rect.width - width + scrollLeft + "px"
          : rect.x + scrollLeft + "px";
    } else if (type === "modal") {
      triggeredElem.style.display = isOpen ? "block" : "none";
      triggeredElem.style.zIndex = getMaxIndex();
      triggeredElem.style.opacity = isOpen ? "1" : "0";
      triggeredElem.style.top = "38%";
      triggeredElem.style.left = "50%";
      triggeredElem.style.transform = "translate(-50%, -50%)";
    }
  };

  // wrapperElement state will be null on the very first render.
  if (!wrapperElement) return null;

  if (renderParent) {
    return createPortal(renderParent(children), wrapperElement);
  } else {
    return createPortal(children, wrapperElement);
  }
};

export default Trigger;
