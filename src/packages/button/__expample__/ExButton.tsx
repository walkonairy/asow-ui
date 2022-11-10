import React from "react";
import Button from "@/packages/button";
import { ButtonSize, ButtonType } from "@/packages/button/Button";

const ExButton = () => {
  return (
    <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexFlow: "wrap",
        }}
      >
        <Button size={{ base: "small", md: "middle", lg: "large" }}>
          Responsive
        </Button>
      </div>

      {["large", "middle", "small"].map((size: ButtonSize) => {
        return ["primary", "default", "dashed", "link", "text"].map(
          (type: ButtonType) => (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexFlow: "wrap",
                }}
              >
                <Button
                  style={{ textTransform: "capitalize" }}
                  type={type}
                  size={size}
                  debounce={1000}
                  onClick={(e) => {
                    console.log("111", e);
                  }}
                >
                  {type}
                </Button>

                <Button
                  style={{ textTransform: "capitalize" }}
                  type={type}
                  size={size}
                  loading
                >
                  {type}
                </Button>

                <Button
                  style={{ textTransform: "capitalize" }}
                  type={type}
                  size={size}
                  danger
                  onClick={(e) => {
                    console.log("222", e);
                  }}
                >
                  {type}
                </Button>

                <Button
                  style={{ textTransform: "capitalize" }}
                  type={type}
                  size={size}
                  danger
                  loading
                >
                  {type}
                </Button>

                <Button
                  style={{ textTransform: "capitalize" }}
                  type={type}
                  size={size}
                  danger
                  disabled
                >
                  {type}
                </Button>

                <Button
                  style={{ textTransform: "capitalize" }}
                  type={type}
                  size={size}
                  danger
                  disabled
                  loading
                >
                  {type}
                </Button>
              </div>
            </>
          )
        );
      })}
    </div>
  );
};

export default ExButton;
