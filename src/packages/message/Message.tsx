import React, { createContext, useContext, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  IoCloseCircleOutline,
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import Portal from "@/packages/portal";
import Text from "@/packages/text";
import { getPrefixCls } from "@/utils";
import classNames from "classnames";
import { Button } from "@asow/ui";

type MessageType = "info" | "success" | "error" | "warning";

interface MessageLists {
  id: number;
  message: MessageProps;
  type: MessageType;
  timer?: any;
  onClose?: (e: any) => void;
  remove?: (e: any) => void;
}

export interface MessageProps extends MessageConfig {
  id?: number;
  title?: string;
  content: string;
  closable?: boolean;
  autoClose?: boolean;
  onClose?: () => void;
  // todo ~  placement?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
}

interface MessageConfig {
  duration?: number;
  maxCount?: number;
}

export interface MessageContextValue {
  info: (message: MessageProps | string) => void;
  success: (message: MessageProps | string) => void;
  warning: (message: MessageProps | string) => void;
  error: (message: MessageProps | string) => void;
}

const Message = createContext<MessageContextValue | null>(null);

export const useMessage = () => {
  const context = useContext(Message);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};

export const MessageProvider: React.FC<{ config?: MessageConfig }> = (
  props
) => {
  const { config, children } = props;
  const _config = config || { maxCount: 3, duration: 3000 };
  const { maxCount: globalMaxCount, duration: globalDuration } = _config;

  const prefixCls: string = getPrefixCls("message");
  const wrapClassnames = classNames(`${prefixCls}-wrap`);
  const containerClassnames = (type: MessageType) => {
    return classNames(`${prefixCls}-container`, `${prefixCls}-${type}`);
  };
  const contentWrapClassnames = classNames(`${prefixCls}-content-wrap`);
  const closeButtonClassnames = (type: MessageType) => {
    return classNames(`${prefixCls}-close`, `${prefixCls}-${type}-close`);
  };

  const [lists, setList] = useState<MessageLists[]>([]);
  const selfTimer = useRef<any>(null);

  const addMessage = (type: MessageType, message: MessageProps | string) => {
    const _message =
      typeof message === "string" ? { content: message } : message;

    onAdd({ id: Date.now(), message: _message, type });
  };

  const onAdd = (option: MessageLists) => {
    const { message: messageProps } = option;

    if (messageProps.id) {
      let arr = [];
      for (let item of lists) {
        arr.push(item.message);
      }
      if (arr.some((item: MessageProps) => item.id === messageProps.id)) return;
    }
    const { autoClose = true, onClose, duration, maxCount } = messageProps;
    const _maxCount = maxCount || globalMaxCount || 3;
    const _duration = duration || globalDuration || 3000;

    setList((pre: MessageLists[]) => {
      let obj = [...pre, option];
      if (_maxCount && obj.length > _maxCount) {
        obj = obj.slice(obj.length - _maxCount);
      }
      if (option.message.autoClose === undefined) {
        option.message.autoClose = true;
      }
      if (autoClose) {
        option.timer = setTimeout(() => {
          onRemove(option.id);
          onClose && onClose();
        }, _duration);
      }
      return obj;
    });
  };

  const onRemove = (id: number) => {
    setList((prev) => prev.filter((message) => message.id !== id));
  };

  const _onClose = (option: MessageLists) => {
    option.timer && clearTimeout(option.timer);
    const { message } = option;
    const { onClose } = message;
    onClose && onClose();
    onRemove(option.id);
  };

  const onMouseEnter = (item: MessageLists) => {
    if (!item.message.autoClose) return;
    clearTimeout(item.timer);
    clearTimeout(selfTimer.current);
  };

  const onMouseLeave = (item: MessageLists) => {
    setTimeout(() => {
      if (!item.message.autoClose) return;
      selfTimer.current = setTimeout(() => {
        _onClose(item);
      }, item.message.duration || globalDuration || 3000);
    }, 100);
  };

  const renderTypeIcon = (type: MessageType) => {
    switch (type) {
      case "info":
        return <IoInformationCircleOutline size="20px" />;
      case "success":
        return <IoCheckmarkCircleOutline size="20px" />;
      case "warning":
        return <IoWarningOutline size="20px" />;
      case "error":
        return <IoCloseCircleOutline size="20px" />;
    }
  };

  return (
    <Message.Provider
      value={{
        info: (message) => addMessage("info", message),
        success: (message) => addMessage("success", message),
        warning: (message) => addMessage("warning", message),
        error: (message) => addMessage("error", message),
      }}
    >
      {children}
      <Portal>
        <div className={wrapClassnames}>
          <TransitionGroup>
            {lists.map((item) => (
              <CSSTransition
                key={item.id}
                timeout={300}
                unmountOnExit
                classNames={`${prefixCls}-fade`}
              >
                <div
                  className={containerClassnames(item.type)}
                  onMouseEnter={() => onMouseEnter(item)}
                  onMouseLeave={() => onMouseLeave(item)}
                >
                  <div>{renderTypeIcon(item.type)}</div>
                  <div className={contentWrapClassnames}>
                    {item.message.title && (
                      <Text tag="tc-3">{item.message.title}</Text>
                    )}
                    <Text>{item.message.content}</Text>
                  </div>
                  {item.message.closable && (
                    <Button
                      type={"text"}
                      size={"small"}
                      onClick={() => _onClose(item)}
                      className={closeButtonClassnames(item.type)}
                    >
                      <IoCloseCircleOutline size="20px" />
                    </Button>
                  )}
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </Portal>
    </Message.Provider>
  );
};
