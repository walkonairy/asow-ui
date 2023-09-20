import { useEffect, useState } from "react";

export function useTimeoutState(state) {
  const tt = useState(false);
  const [timeoutState, setTimeoutState] = tt;

  useEffect(() => {
    setTimeout(() => {
      setTimeoutState(state);
    });
  }, [state]);

  return tt;
}
