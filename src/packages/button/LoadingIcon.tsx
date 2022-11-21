import React from "react";
import { getPrefixCls } from "@/utils";
import { Icon } from "@/index";

export type LoadingProps = { loading: boolean };

const LoadingIcon = (props: LoadingProps) => {
  const { loading } = props;
  const className = getPrefixCls(`btn-loading-icon-${loading}`);

  return (
    <>
      <Icon icon={["fas", "spinner"]} className={className} />
    </>
  );
};
export default LoadingIcon;
