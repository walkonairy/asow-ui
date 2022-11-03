import { useResponsive } from "@/hooks/useResponsive";

type ResponsiveType = "base" | "sm" | "md" | "lg" | "xl";
export type ResponsiveObj<T> = Partial<Record<ResponsiveType, T>> | string;
export type Token<T> = T | ResponsiveObj<T>;

const computeSizeObj = (obj) => {
  const SIZE = {
    base: "",
    sm: "",
    md: "",
    lg: "",
    xl: "",
  };

  const SIZE_ARRAY = Object.keys(SIZE);
  const sizeIterator = SIZE_ARRAY[Symbol.iterator]();
  let iterator = sizeIterator.next();

  for (let objKey in obj) {
    for (let sizeKey in SIZE) {
      if (objKey === sizeKey) {
        SIZE[sizeKey] = obj[objKey];
      }
    }
  }

  let key = "";
  while (!iterator.done) {
    if (SIZE[iterator.value]) {
      key = iterator.value;
      iterator = sizeIterator.next();
    } else {
      if (key) {
        SIZE[iterator.value] = SIZE[key];
      } else {
        iterator = sizeIterator.next();
      }
    }
  }
  return SIZE;
};

export const useSize = (size: ResponsiveObj<string>) => {
  if (typeof size === "string") {
    return size;
  }

  const response = useResponsive();
  const computeResponsiveObj = computeSizeObj(size);

  let responseKey;
  for (const boolean in response) {
    if (response[boolean]) {
      responseKey = boolean;
    }
  }

  return computeResponsiveObj[responseKey];
};
