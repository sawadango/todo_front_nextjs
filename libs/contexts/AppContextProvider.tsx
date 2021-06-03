import React from "react";
import { Message } from "../../types/type";
import {
  SystemMessageContext,
  useSystemMessageContext,
} from "./SystemMessageContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const AppContextProvider = (props) => {
  const systemMessageContext = useSystemMessageContext();
  const [messages, setMessages] = React.useState<Message[]>(
    systemMessageContext.messages
  );

  React.useEffect(() => {
    setMessages(systemMessageContext.messages);
  }, [systemMessageContext.messages]);

  const removeMessages = (id: number) => {
    setMessages((prevState) => prevState.filter((m) => m.id !== id));
    systemMessageContext.removeMessages(id);
  };

  const showToast = (message: Message) => {
    toast.success(message.message, {
      toastId: message.id,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onOpen: () => removeMessages(message.id),
    });
  };

  React.useEffect(() => {
    messages.forEach((m) => showToast(m));
  }, [messages]);

  return (
    <>
      <SystemMessageContext.Provider value={systemMessageContext}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {props.children}
      </SystemMessageContext.Provider>
    </>
  );
};

export default AppContextProvider;
