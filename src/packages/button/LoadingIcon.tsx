import React from "react";
import { getPrefixCls } from "@/utils";

export type LoadingProps = { loading: boolean };

const LoadingIcon = (props: LoadingProps) => {
  const { loading } = props;
  const className = getPrefixCls(`btn-loading-icon-${loading}`);

  return (
    <>
      <span className={className} />
    </>
  );
};
export default LoadingIcon;
