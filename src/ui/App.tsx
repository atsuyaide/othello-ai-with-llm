import { Game, GameState } from "@app/ui/containers/Game";
import { Provider } from "react-redux";
import { Store } from "redux";
export interface AppProps {
  store: Store<GameState>;
}
const App = ({ store }: AppProps) => (
  <>
    <Provider store={store}>
      <Game />
    </Provider>
  </>
);

export default App;
