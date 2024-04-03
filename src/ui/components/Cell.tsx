import * as style from "@app/ui/constants/style";
import { CellState, Color, Place } from "@app/ui/types";
import { CSSProperties } from "react";
import * as Constants from "../constants/style";

export interface CellProps {
  place: Place;
  state: CellState;
  scale?: number;
  highlight: boolean;
  onClick: () => void;
}

export const Cell = (props: CellProps) => (
  <div
    style={cellStyle(props.highlight)}
    onClick={props.onClick}
    data-testid="cell"
  >
    {props.state === "." && null}
    {props.state === "b" && (
      <span data-testid="stone" style={stoneStyle(props.state)} />
    )}
    {props.state === "w" && (
      <span data-testid="stone" style={stoneStyle(props.state)} />
    )}
    {props.state === "*" && (
      <span data-testid="marker" style={movableStyle()} />
    )}
  </div>
);

const cellStyle = (highlight: boolean, scale: number = 1): CSSProperties => ({
  float: "left",
  position: "relative",
  width: style.cellWidth * scale,
  height: style.cellWidth * scale,
  margin: style.cellMargin * scale,
  background: highlight ? Constants.boardColorHighlight : Constants.boardColor,
  alignItems: "center",
});

const stoneStyle = (color: Color, scale: number = 1) => ({
  display: "inline-block",
  width: (style.cellWidth - style.stoneMargin * 2) * scale,
  height: (style.cellWidth - style.stoneMargin * 2) * scale,
  borderRadius: style.cellWidth * scale,
  background:
    color == "b" ? Constants.stoneColorBlack : Constants.stoneColorWhite,
  margin: style.stoneMargin,
});

const movableStyle = (scale: number = 1) => ({
  display: "inline-block",
  width: (style.cellWidth - style.movableMargin * 2) * scale,
  height: (style.cellWidth - style.movableMargin * 2) * scale,
  borderRadius: style.cellWidth * scale,
  background: Constants.movableCellColor,
  margin: style.movableMargin,
});
