import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";

import "./styles/index.scss";

import Button from "@/packages/button";

ReactDOM.render(
  <ChakraProvider>
    <Button type="link" loading>
      button
    </Button>
  </ChakraProvider>,
  document.getElementById("root")
);
