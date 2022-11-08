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
          danger
          size={{ base: "small", md: "middle", lg: "large" }}
        >
          Responsive
        </Button>

        <Button type="primary" size="large">
          Large
        </Button>

        <Button type="default" size="large">
          Default
        </Button>

        <Button type="dashed" size="large">
          Dashed
        </Button>

        <Button type="link" size="large">
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
