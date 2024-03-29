import * as Ai from "@app/ai";
import { fromUiState, reverse, toUiState } from "@app/bitboard/Board";
import * as Move from "@app/bitboard/move";
import { Action } from "@app/ui/actions";
import * as Constants from "@app/ui/constants";
import { GameState, Position } from "@app/ui/containers/Game";
import { CellState, Color, Place } from "@app/ui/types";
import * as _ from "lodash";
import { Reducer } from "redux";

export function turn(state: Color): Color {
  return state == "b" ? "w" : "b";
}

export function cells(state: CellState[]): CellState[] {
  return state;
}

export function move(state: GameState, place?: Place): GameState {
  const latest = _.last(state.positions) as Position;
  const nextTurn: Color = latest.turn == "b" ? "w" : "b";
  const board =
    latest.turn == "b"
      ? fromUiState(latest.cells)
      : reverse(fromUiState(latest.cells));

  if (!place)
    return {
      ...state,
      positions: _.concat(state.positions, [
        {
          cells: latest.cells,
          turn: nextTurn,
        },
      ]),
    };

  if (!Move.canMove(board, place.x, place.y)) return state;

  const nextBoard =
    latest.turn == "b"
      ? Move.move(board, place.x, place.y)
      : reverse(Move.move(board, place.x, place.y));

  return {
    ...state,
    latestMove: place,
    positions: _.concat(state.positions, [
      {
        cells: toUiState(nextBoard),
        turn: nextTurn,
      },
    ]),
  };
}

export const reducers: Reducer<GameState, Action> = (
  state = Constants.initialState,
  action
): GameState => {
  const latestPosition = state.positions[state.positions.length - 1];
  if (action.type == "click_cell" && latestPosition.turn == state.playerColor) {
    return move(state, action.place);
  }

  if (action.type == "click_pass" && latestPosition.turn == state.playerColor) {
    return move(state);
  }

  if (action.type == "launch_ai" && latestPosition.turn != state.playerColor) {
    const board =
      latestPosition.turn == "b"
        ? fromUiState(latestPosition.cells)
        : reverse(fromUiState(latestPosition.cells));
    const moves = Ai.run(board);

    console.log("--- ai moves");
    console.log(moves.map((m) => `${m.place.x},${m.place.y} ${m.score}`));
    return move(state, moves.length > 0 ? moves[0].place : undefined);
  }

  if (action.type == "click_prev") {
    const positions = state.positions;
    if (positions.length <= 1) return { ...state, positions };
    const currTurn = (_.last(positions) as Position).turn;
    positions.pop();
    while (
      positions.length > 0 &&
      (_.last(positions) as Position).turn != currTurn
    ) {
      positions.pop();
    }
    return { ...state, positions, latestMove: undefined };
  }

  return state;
};

// export function reducers(state: GameState, action: Action): GameState {
//   const latestPosition = state.positions[state.positions.length - 1];
//   if (action.type == "click_cell" && latestPosition.turn == state.playerColor) {
//     return move(state, action.place);
//   }
//
//   if (action.type == "click_pass" && latestPosition.turn == state.playerColor) {
//     return move(state);
//   }
//
//   if (action.type == "launch_ai" && latestPosition.turn != state.playerColor) {
//     const board =
//       latestPosition.turn == "b"
//         ? fromUiState(latestPosition.cells)
//         : reverse(fromUiState(latestPosition.cells));
//     const moves = Ai.run(board);
//
//     console.log("--- ai moves");
//     console.log(moves.map((m) => `${m.place.x},${m.place.y} ${m.score}`));
//     return move(state, moves.length > 0 ? moves[0].place : undefined);
//   }
//
//   if (action.type == "click_prev") {
//     const positions = state.positions;
//     if (positions.length <= 1) return { ...state, positions };
//     const currTurn = (_.last(positions) as Position).turn;
//     positions.pop();
//     while (
//       positions.length > 0 &&
//       (_.last(positions) as Position).turn != currTurn
//     ) {
//       positions.pop();
//     }
//     return { ...state, positions, latestMove: undefined };
//   }
//
//   return state;
// }
