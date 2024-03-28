import * as Constants from "@app/ui/constants";
import { GameState } from "@app/ui/containers/Game";
import React from "react";
import ReactDOM from "react-dom/client";
import { applyMiddleware, legacy_createStore, Middleware } from "redux";
import { createLogger } from "redux-logger";
import App from "./App";
import { reducers } from "./reducers";

const middleWares: Middleware[] = [
  process.env.NODE_ENV !== "production" && (createLogger() as any),
].filter(Boolean);
let store = legacy_createStore<GameState>(
  reducers,
  {
    positions: [
      {
        cells: Constants.initialBoard,
        turn: "b",
      },
    ],
    playerColor: "b",
  },
  applyMiddleware(...middleWares)
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
