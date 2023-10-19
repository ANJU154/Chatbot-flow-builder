import React from "react";
import { ToastContainer, Slide } from "react-toastify";

import ChatbotFlowBuilderRoute from "./container/ChatbotFlowBuilder";
import "../src/styles/global.css";
import "../src/styles/main.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer transition={Slide} />
      <ChatbotFlowBuilderRoute />
    </>
  );
};

export default App;
