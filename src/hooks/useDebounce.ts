import { useEffect } from "react";

export function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debounceFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const clearDebounce = () => clearTimeout(timer);
  return [debounceFunc, clearDebounce];
}

export const useDebounce = <A = unknown, R = void>(
  fn: (args: A) => R,
  ms: boolean | number
): ((args: A) => Promise<R>) => {
  const _ms = typeof ms === "number" ? ms : 300;
  const [debounceFunc, clearDebounce] = debounce<A, R>(fn, _ms);

  useEffect(() => () => clearDebounce(), []);

  return debounceFunc;
};
