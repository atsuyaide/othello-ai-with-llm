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

/**
 * ゲームの状態を更新するための関数.
 *
 * @param state - 現在のゲームの状態
 * @param place - 石を置く場所の座標（オプション）
 * @returns 更新されたゲームの状態
 */
export function move(state: GameState, place?: Place): GameState {
  const latest = _.last(state.positions) as Position;
  const nextTurn: Color = latest.turn == "b" ? "w" : "b";
  const board =
    latest.turn == "b"
      ? fromUiState(latest.cells)
      : reverse(fromUiState(latest.cells));

  // placeが指定されていない場合はパス
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

  // x, yに置けなければ何もしない
  if (!Move.canMove(board, place.x, place.y)) return state;

  // placeに置けるので石を置く
  const nextBoard =
    latest.turn == "b"
      ? Move.move(board, place.x, place.y)
      : reverse(Move.move(board, place.x, place.y));
  const nextCells = toUiState(nextBoard);

  // 次のターンがプレイヤーの場合は置ける場所を表示
  if (nextTurn == state.playerColor) {
    const movablePlaces = Move.movables(nextBoard);
    movablePlaces.forEach((p) => {
      nextCells[p.y * 8 + p.x] = "*";
    });
  }

  // 石を置いた後の状態を返す
  return {
    ...state,
    latestMove: place,
    moveScores: Ai.iterativeDeepning(fromUiState(nextCells)),
    positions: _.concat(state.positions, [
      {
        cells: nextCells,
        turn: nextTurn,
      },
    ]),
  };
}

/**
 * Reducer関数.
 * @param state 現在のゲームの状態
 * @param action 実行されたアクション
 * @returns 新しいゲームの状態
 */
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
    // console.log(moves.map((m) => `${m.place.x},${m.place.y} ${m.score}`));
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
