import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getPrefixCls } from "@/utils";

export type LoadingProps = { loading: boolean };

const LoadingIcon = (props: LoadingProps) => {
  const { loading } = props;
  const className = getPrefixCls(`btn-loading-icon-${loading}`);

  return (
    <>
      <AiOutlineLoading3Quarters className={className} />
    </>
  );
};
export default LoadingIcon;
