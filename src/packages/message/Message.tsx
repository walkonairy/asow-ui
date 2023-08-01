import React, { createContext, useContext, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Portal from "@/packages/portal";
import { getPrefixCls } from "@/utils";
import classNames from "classnames";

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
  const { maxCount: globalMaxCount, duration: globalDuration } = config;

  const prefixCls: string = getPrefixCls("message");
  const wrapClassnames = classNames(`${prefixCls}-wrap`);
  const contentClassnames = classNames(`${prefixCls}-content`);

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
                  className={contentClassnames}
                  onMouseEnter={() => onMouseEnter(item)}
                  onMouseLeave={() => onMouseLeave(item)}
                >
                  {item.message.title && <div>{item.message.title}</div>}
                  <div>{item.message.content + item.id}</div>
                  {item.message.closable && (
                    <button onClick={() => _onClose(item)}>Close</button>
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
