import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";

import ExButton from "@/packages/button/__expample__/ExButton";
import ExInput from "@/packages/input/__expample__/ExInput";

ReactDOM.render(
  <div style={{ gap: 32, display: "flex", flexDirection: "column" }}>
    <div>
      <ExButton />
    </div>
  </div>,
  document.getElementById("root")
);
