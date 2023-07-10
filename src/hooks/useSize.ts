import { useResponsive } from "@/hooks/useResponsive";

export type ResponsiveType = "base" | "sm" | "md" | "lg" | "xl";
export type ResponsiveObj<T> = Partial<Record<ResponsiveType, T>>;
export type Token<T> = T | ResponsiveObj<T>;

const computeSizeObj = (obj) => {
  const sizeObj = {
    base: "",
    sm: "",
    md: "",
    lg: "",
    xl: "",
  };

  const sizeKeys = Object.keys(sizeObj);

  for (let objKey in obj) {
    if (sizeKeys.includes(objKey)) {
      sizeObj[objKey] = obj[objKey];
    }
  }

  let prevKey = "";
  for (let key of sizeKeys) {
    if (!sizeObj[key] && prevKey) {
      sizeObj[key] = sizeObj[prevKey];
    } else {
      prevKey = key;
    }
  }

  return sizeObj;
};

export const useSize = <T>(size: Token<T>) => {
  // 没传值或者传了个string的时候就直接返回
  if (!size || typeof size === "string") {
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
