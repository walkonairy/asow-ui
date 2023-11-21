import "./styles/index.scss";

export { default as Button } from "@/packages/button";
export type { ButtonProps } from "@/packages/button";

export { default as Input } from "@/packages/input";
export type {
  InputProps,
  PasswordProps,
  TextAreaProps,
} from "@/packages/input";

export { default as Calendar } from "@/packages/calendar";

export { default as Modal } from "@/packages/modal";

export { default as Text } from "@/packages/text";

export { MessageProvider, useMessage } from "@/packages/message";

export { default as Drawer } from "@/packages/drawer";

// export * from "@/utils";

// const getMaxIndex = () => {
//   const bodyElement = [...document.body.querySelectorAll("*")];
//   const indexArr: any = [];
//   for (let item of bodyElement) {
//     indexArr.push(Number(window.getComputedStyle(item).zIndex) || 0);
//   }
//   return String(Math.max(...indexArr) + 1);
// };
