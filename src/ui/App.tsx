import { Game, GameState } from "@app/ui/containers/Game";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Action } from "./actions";
export interface AppProps {
  store: Store<GameState, Action>;
}
const App = ({ store }: AppProps) => (
  <>
    <Provider store={store}>
      <Game />
    </Provider>
  </>
);

export default App;
