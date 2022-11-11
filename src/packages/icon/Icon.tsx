import React, { FC } from "react";
import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import { getPrefixCls } from "@/utils";
import classNames from "classnames";

type Theme = "primary" | "warning" | "danger";

export interface IconProps extends FontAwesomeIconProps {
  theme?: Theme;
}

const Icon: FC<IconProps> = (props) => {
  const { className, theme, icon, ...rest } = props;
  const prefixCls = getPrefixCls("icon");

  const _className = classNames(
    prefixCls,
    {
      [`icon-${theme}`]: theme,
    },
    className
  );

  return <FontAwesomeIcon icon={icon} className={_className} {...rest} />;
};

export default Icon;
