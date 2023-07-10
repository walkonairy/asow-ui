import { useEffect, useState } from "react";

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();

type ResponsiveConfig = Record<string, number>;
type ResponsiveInfo = Record<string, boolean>;

let info: ResponsiveInfo;

let responsiveConfig: ResponsiveConfig = {
  base: 0,
  sm: 375,
  md: 640,
  lg: 1024,
  xl: 1440,
};

const isBrowser = typeof window !== "undefined" && !!window.document;

function handleResize() {
  const oldInfo = info;
  calculate();
  if (oldInfo === info) return;
  subscribers.forEach((subscriber) => subscriber());
}

let listening = false;

function calculate() {
  const width = window.innerWidth;
  const newInfo = {} as ResponsiveInfo;
  let shouldUpdate = false;

  Object.entries(responsiveConfig).forEach(([key, value]) => {
    const newInfoValue = width >= value;
    newInfo[key] = newInfoValue;
    if (newInfoValue !== info[key]) {
      shouldUpdate = true;
    }
  });

  if (shouldUpdate) {
    info = newInfo;
  }
}

export function configResponsive(config: ResponsiveConfig) {
  responsiveConfig = config;
  if (info) calculate();
}

export function useResponsive() {
  if (isBrowser && !listening) {
    info = {};
    calculate();
    window.addEventListener("resize", handleResize);
    listening = true;
  }
  const [state, setState] = useState<ResponsiveInfo>(info);

  useEffect(() => {
    if (!isBrowser) return;

    const subscriber: Subscriber = () => {
      setState(info);
    };
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        window.removeEventListener("resize", handleResize);
        listening = false;
      }
    };
  }, []);

  return state;
}
