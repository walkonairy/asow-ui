import React from "react";
import { MessageProvider, useMessage } from "../Message";

const Some = () => {
  const message = useMessage();

  const handleShowMessageInfo = () => {
    message.info({
      title: "标题",
      content: "这是内容...",
      autoClose: false,
      duration: 3000,
      maxCount: 4,
      closable: true,
    });
  };

  const handleShowMessageSuccess = () => {
    message.success({
      title:
        "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
      content:
        "这是内容...这是内容...这是内容...这是内容...这是内容...这是内容...这是内容...这是内容...这是内容...这是内容...这是内容...",
      autoClose: false,
      duration: 3000,
      maxCount: 4,
      closable: true,
    });
  };

  const handleShowMessageWarning = () => {
    message.warning({
      title: "标题",
      content: "这是内容...",
      autoClose: false,
      duration: 3000,
      maxCount: 4,
      closable: true,
    });
  };

  const handleShowMessageError = () => {
    message.error({
      title: "标题",
      content: "这是内容...",
      autoClose: false,
      duration: 3000,
      maxCount: 4,
      closable: true,
    });
  };
  return (
    <div style={{ marginTop: 600 }}>
      <button onClick={handleShowMessageInfo}>Show Info Message</button>
      <button onClick={handleShowMessageSuccess}>Show Success Message</button>
      <button onClick={handleShowMessageWarning}>Show Warning Message</button>
      <button onClick={handleShowMessageError}>Show Error Message</button>
    </div>
  );
};

const Some2 = () => {
  const message = useMessage();

  const handleShowMessage = () => {
    message.success("写点内容吧");
  };
  return (
    <>
      <button onClick={handleShowMessage}>Show Error Message</button>
    </>
  );
};

const ExMessage = () => {
  return (
    <MessageProvider config={{ maxCount: 3 }}>
      <Some />
      <Some2 />
    </MessageProvider>
  );
};

export default ExMessage;
