import React from "react";
import ReactDOM from "react-dom";

import ExButton from "@/packages/button/__expample__/ExButton";

import { Button } from "@asow/ui";
import "@asow/ui/dist/index.css";

ReactDOM.render(
  <div style={{ gap: 16, display: "flex", flexDirection: "column" }}>
    <div>
      <ExButton />
    </div>
    <div>
      <Button size="large" type="primary">
        Submit
      </Button>
    </div>
  </div>,
  document.getElementById("root")
);
