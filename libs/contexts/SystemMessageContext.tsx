import React from "react";
import { Message } from "../../types/type";

interface SystemMessageContextType {
  readonly messages: Message[];
  removeMessages: (id: number) => void;
  success: (message: string) => Promise<void>;
  danger: (message: string) => Promise<void>;
}

export const SystemMessageContext =
  React.createContext<SystemMessageContextType>({
    messages: [],
    removeMessages: () => {},
    success: () => {
      throw new Error();
    },
    danger: () => {
      throw new Error();
    },
  });

export const useSystemMessageContext = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  const addMessage = (message: string): void => {
    const uniqueId: number = Math.trunc(Math.random() * 10000);
    setMessages((prevState) => [...prevState, { id: uniqueId, message }]);
  };

  const removeMessages = (id: number) => {
    setMessages((prevState) => prevState.filter((m) => m.id !== id));
  };

  const success = async (message: string): Promise<void> => {
    addMessage(message);
  };

  const danger = async (message: string): Promise<void> => {
    addMessage(message);
  };

  return {
    messages,
    removeMessages,
    success,
    danger,
  };
};
