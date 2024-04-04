import { Cell } from "@app/ui/components/Cell";
import * as style from "@app/ui/constants/style";
import { CellState, Place } from "@app/ui/types";
import * as _ from "lodash";

export interface BoardProps {
  cells: CellState[];
  evalScores?: number[];
  highlight?: Place;
  onClickCell: OnClickCell;
}

export interface OnClickCell {
  (place: Place): void;
}

export const Board = (props: BoardProps) => (
  <div style={boardStyle()} data-testid="board-component">
    {_.range(8).map((rowIdx) => (
      <BoardRow
        key={rowIdx}
        rowIdx={rowIdx}
        cells={props.cells.slice(rowIdx * 8, (rowIdx + 1) * 8)}
        evalScores={
          props.evalScores
            ? props.evalScores.slice(rowIdx * 8, (rowIdx + 1) * 8)
            : undefined
        }
        onClickCell={props.onClickCell}
        highlight={
          props.highlight && props.highlight.y == rowIdx
            ? props.highlight.x
            : undefined
        }
      />
    ))}
  </div>
);

const boardStyle = () => ({
  width: style.boardWidth,
  height: style.boardWidth,
  margin: style.boardMargin,
});

export interface BoardRowProps {
  rowIdx: number;
  cells: CellState[];
  evalScores?: number[];
  onClickCell: OnClickCell;
  highlight?: number;
}

export const BoardRow = (props: BoardRowProps) => (
  <div style={boardRowStyle()}>
    {_.range(8).map((colIdx) => (
      <Cell
        key={colIdx}
        place={{ x: colIdx, y: props.rowIdx }}
        state={props.cells[colIdx]}
        evalScore={props.evalScores ? props.evalScores[colIdx] : undefined}
        onClick={() => props.onClickCell({ x: colIdx, y: props.rowIdx })}
        highlight={props.highlight ? props.highlight == colIdx : false}
      />
    ))}
  </div>
);

const boardRowStyle = () => ({
  width: style.boardWidth,
  height: style.cellWidth + style.cellMargin * 2,
});
