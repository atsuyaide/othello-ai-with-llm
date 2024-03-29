import * as style from "@app/ui/constants/style";
import { CellState, Color, Place } from "@app/ui/types";
import { CSSProperties } from "react";

export interface CellProps {
  place: Place;
  state: CellState;
  scale?: number;
  highlight: boolean;
  onClick: () => void;
}

export const Cell = (props: CellProps) => (
  <div style={cellStyle(props.highlight)} onClick={props.onClick}>
    {props.state === "." && null}
    {props.state === "b" && <span style={stoneStyle(props.state)} />}
    {props.state === "w" && <span style={stoneStyle(props.state)} />}
    {props.state === "*" && <span style={movableStyle()} />}
  </div>
);

const cellStyle = (highlight: boolean, scale: number = 1): CSSProperties => ({
  float: "left",
  width: style.cellWidth * scale,
  height: style.cellWidth * scale,
  margin: style.cellMargin * scale,
  background: highlight ? "#5d5" : "#009900",
});

const stoneStyle = (color: Color, scale: number = 1) => ({
  display: "inline-block",
  width: (style.cellWidth - style.stoneMargin * 2) * scale,
  height: (style.cellWidth - style.stoneMargin * 2) * scale,
  borderRadius: style.cellWidth * scale,
  background: color == "b" ? "#202720" : "#fff",
  margin: style.stoneMargin,
});

const movableStyle = (scale: number = 0.1) => ({
  width: (style.cellWidth - style.stoneMargin * 2) * scale,
  height: (style.cellWidth - style.stoneMargin * 2) * scale,
  borderRadius: style.cellWidth * scale,
  background: "#202720",
  margin: style.movableMargin,
});
