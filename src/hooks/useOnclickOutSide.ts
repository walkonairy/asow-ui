import { useEffect } from "react";

export function useOnClickOutside(callback: () => void, ref) {
  useEffect(() => {
    function handler(event) {
      if (!ref.current?.contains(event.target)) {
        callback();
      }
    }
    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [callback, ref]);
}
