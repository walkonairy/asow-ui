import { useEffect, useRef } from "react";

export function useRollbackOverflow(isOpen: boolean) {
  const overflowRef = useRef("");

  /**
   * 缓存原始的overflow属性值
   */
  useEffect(() => {
    overflowRef.current = document.body.style.overflow;
  }, []);

  /**
   * 当打开modal时禁止滚动屏幕，关闭时等动画关闭恢复至缓存值
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = overflowRef.current;
      }, 360);
    }
  }, [isOpen]);
}
