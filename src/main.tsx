import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.scss";
import { FormProvider } from "./context/formContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>
);
