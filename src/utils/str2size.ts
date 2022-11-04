const SizeStr = {
  small: "sm",
  middle: "md",
  large: "lg",
};

export type Size = keyof typeof SizeStr;

export const str2size = (str: Size) => SizeStr[str];
