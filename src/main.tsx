import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.scss";
import { FormProvider } from "./context/formContext.tsx";
import { Provider } from 'react-redux'
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FormProvider>
        <App />
      </FormProvider>
    </Provider>
  </React.StrictMode>
);
