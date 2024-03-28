import * as Constants from "@app/ui/constants";
import { Game, GameState } from "@app/ui/containers/Game";
import { reducers } from "@app/ui/reducers";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, Middleware, Store } from "redux";
import { createLogger } from "redux-logger";

const middleWares: Middleware[] = [
  process.env.NODE_ENV !== "production" && (createLogger() as any),
].filter(Boolean);

export function start(dom: HTMLElement | null) {
  let store = createStore<GameState>(
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

  ReactDOM.render(<App store={store} />, dom);
}

export interface AppProps {
  store: Store<GameState>;
}
const App = ({ store }: AppProps) => (
  <Provider store={store}>
    <Game />
  </Provider>
);

export default App;
