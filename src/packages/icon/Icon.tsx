import React, { FC } from "react";
import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import { getPrefixCls } from "@/utils";
import classNames from "classnames";
import { useResponsive } from "@/hooks/useResponsive";

type Theme = "primary" | "warning" | "danger";

export interface IconProps extends FontAwesomeIconProps {
  theme?: Theme;
}

const Icon: FC<IconProps> = (props) => {
  const { className, theme, icon, ...rest } = props;
  const prefixCls = getPrefixCls("icon");
  const { lg } = useResponsive();

  const _className = classNames(
    prefixCls,
    {
      [`icon-${theme}`]: theme,
    },
    className
  );

  return (
    <FontAwesomeIcon
      icon={icon}
      className={_className}
      width={lg ? "20px" : "18px"}
      {...rest}
    />
  );
};

export default Icon;
