import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import logger from "redux-logger";
import App from "./App";
import { reducers } from "./reducers";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return process.env.NODE_ENV !== "production"
      ? getDefaultMiddleware()
      : getDefaultMiddleware().concat(logger);
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
