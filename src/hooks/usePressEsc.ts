import { useEffect } from "react";

export function usePressEsc(isOpen, callback) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        callback?.();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);
}
