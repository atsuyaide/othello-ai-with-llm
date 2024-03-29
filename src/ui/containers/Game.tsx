import * as Board from "@app/bitboard/Board";
import * as Move from "@app/bitboard/move";
import * as actions from "@app/ui/actions";
import Main, { Status } from "@app/ui/components/Main";
import { CellState, Color, Place } from "@app/ui/types";
import * as _ from "lodash";
import { connect } from "react-redux";
import { Dispatch } from "redux";

export interface GameState {
  positions: Position[];
  playerColor: Color;
  latestMove?: Place;
}

export interface Position {
  turn: Color;
  cells: CellState[];
}

function mapStateToProps(state: GameState) {
  const position = _.last(state.positions) as Position;
  const board =
    position.turn == "b"
      ? Board.fromUiState(position.cells)
      : Board.reverse(Board.fromUiState(position.cells));
  console.log(Move.movables(board));

  const [black, white] =
    position.turn == "b" ? Board.stones(board) : Board.stones(board).reverse();

  // 終了判定
  let status: Status = "normal";
  if (Move.movables(board).length == 0) {
    if (Move.movables(Board.reverse(board)).length == 0) {
      status = "finished";
    } else {
      status = "pass";
    }
  }
  return {
    cells: position.cells,
    turn: position.turn,
    status,
    black,
    white,
    playerColor: state.playerColor,
    latestMove: state.latestMove,
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.BoardAction>) {
  return {
    onClickCell(place: Place) {
      dispatch(actions.clickCell(place));
    },
    onClickPrev() {
      dispatch(actions.clickPrev);
    },
    onClickPass() {
      dispatch(actions.clickPass);
    },
    launchAi() {
      dispatch(actions.aiMove);
    },
  };
}

export const Game = connect(mapStateToProps, mapDispatchToProps)(Main);
