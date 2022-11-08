import React from "react";
import Button from "@/packages/button";

const ExButton = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexFlow: "wrap",
        }}
      >
        <Button
          type="default"
          size={{ base: "small", md: "middle", lg: "large" }}
          onClick={(event) => {
            console.log(event);
          }}
          loading={false}
        >
          Responsive
        </Button>

        <Button type="primary" size="large" loading={false}>
          确认提交
        </Button>

        <Button type="default" size="large" danger loading={true}>
          Default
        </Button>

        <Button type="dashed" size="large" danger>
          Dashed
        </Button>

        <Button type="link" size="large" danger loading={false}>
          Link
        </Button>

        <Button type="text" size="large">
          Text
        </Button>

        <Button type="primary" size="large" disabled>
          Disabled
        </Button>
      </div>
    </>
  );
};

export default ExButton;
