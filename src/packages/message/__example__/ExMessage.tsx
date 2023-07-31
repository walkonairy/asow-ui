import React from "react";
import { MessageProvider, useMessage } from "../Message";

const Some = () => {
  const message = useMessage();

  const handleShowMessage = () => {
    // message.show({ type: "info", title: "test", content: "test content" });
    message.info({
      title: "info",
      content: "info content",
      autoClose: true,
      duration: 3000,
    });
  };
  return (
    <>
      <button onClick={handleShowMessage}>Show Info Message</button>
    </>
  );
};

const Some2 = () => {
  const message = useMessage();

  const handleShowMessage = () => {
    // message.show({ type: "info", title: "test", content: "test content" });
    message.error("test");
  };
  return (
    <>
      <button onClick={handleShowMessage}>Show Error Message</button>
    </>
  );
};

const ExMessage = () => {
  return (
    <MessageProvider>
      <Some />
      <Some2 />
    </MessageProvider>
  );
};

export default ExMessage;
