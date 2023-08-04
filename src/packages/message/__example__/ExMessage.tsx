import React from "react";
import { MessageProvider, useMessage } from "../Message";
import { Button } from "@asow/ui";

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
      <Button onClick={handleShowMessageInfo}>Show Info Message</Button>
      <Button onClick={handleShowMessageSuccess}>Show Success Message</Button>
      <Button onClick={handleShowMessageWarning}>Show Warning Message</Button>
      <Button onClick={handleShowMessageError}>Show Error Message</Button>
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
      <Button onClick={handleShowMessage}>Show Error Message</Button>
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
