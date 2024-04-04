import { Board, OnClickCell } from "@app/ui/components/Board";
import { Control } from "@app/ui/components/Control";
import * as style from "@app/ui/constants/style";
import { CellState, Color, Place } from "@app/ui/types";
import _ from "lodash";
import { useEffect } from "react";

export interface MainProps {
  cells: CellState[];
  latestMove?: Place;
  turn: Color;
  onClickCell: OnClickCell;
  onClickPass: () => void;
  onClickPrev: () => void;
  launchAi: () => void;
  status: Status;
  playerColor: Color;
  black: number;
  white: number;
}

export type Status = "normal" | "pass" | "finished";

const Main = (props: MainProps) => {
  useEffect(() => {
    console.log(`${props.black} - ${props.white}`);
    console.log(
      _.chunk(props.cells, 8)
        .map((row) => row.join(""))
        .join("\n")
    );
    if (props.turn != props.playerColor && props.status != "finished") {
      setTimeout(() => props.launchAi(), 20);
    }
  }, [props]);
  return (
    <div style={mainStyle()} data-testid="main-component">
      <Board
        cells={props.cells}
        evalScores={Array.from({ length: 64 }, (_, i) => i)}
        onClickCell={props.onClickCell}
        highlight={props.latestMove}
      />
      <Control
        shouldPass={props.status == "pass"}
        onClickPass={props.onClickPass}
        onClickPrev={props.onClickPrev}
        black={props.black}
        white={props.white}
      />
    </div>
  );
};

const mainStyle = () => ({
  width: style.mainWidth,
  height: style.mainHeight,
  margin: "auto",
});

export default Main;
