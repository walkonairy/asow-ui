import { useEffect } from "react";

export function useOnClickOutside(callback: (e: any) => void, ref) {
  useEffect(() => {
    function handler(event) {
      if (!ref.current?.contains(event.target)) {
        callback(event);
      }
    }
    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [callback, ref]);
}
