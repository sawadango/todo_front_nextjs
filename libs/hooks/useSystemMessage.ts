import React from "react";
import { SystemMessageContext } from "../contexts/SystemMessageContext";

const useSystemMessage = () => {
  const { success, danger } = React.useContext(SystemMessageContext);
  return { success, danger };
};

export default useSystemMessage;
