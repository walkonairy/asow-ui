import { useEffect, RefObject } from "react";

export function useOnClickOutside<T extends HTMLElement>(
  callback: (event: MouseEvent | TouchEvent) => void,
  ref: RefObject<T>
) {
  useEffect(() => {
    function handler(event: MouseEvent | TouchEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        callback(event);
      }
    }
    window.addEventListener("click", handler);
    window.addEventListener("touchstart", handler);

    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, [callback, ref]);
}
