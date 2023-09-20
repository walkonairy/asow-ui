import "./styles/index.scss";

import { library } from "@fortawesome/fontawesome-svg-core"; // 导入图标仓库
import { fas } from "@fortawesome/free-solid-svg-icons"; // 全部图标
library.add(fas); // 把图标添加进仓库

export { default as Button } from "@/packages/button";
export type { ButtonProps } from "@/packages/button";

export { default as Input } from "@/packages/input";
export type {
  InputProps,
  PasswordProps,
  TextAreaProps,
} from "@/packages/input";

export { default as Icon } from "@/packages/icon";
export type { IconProps } from "@/packages/icon";

export { default as Calendar } from "@/packages/calendar";

export { default as Modal } from "@/packages/modal";

export { default as Text } from "@/packages/text";

export { MessageProvider, useMessage } from "@/packages/message";

export { default as Drawer } from "@/packages/drawer";

// export * from "@/utils";
