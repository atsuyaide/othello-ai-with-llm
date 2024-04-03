import { describe, expect, it, vi } from "vitest";
import { initialBoard } from "../constants";
import { GameState, mapDispatchToProps, mapStateToProps } from "./Game";

describe("mapStateToProps", () => {
  it("should return the correct props", () => {
    const state: GameState = {
      positions: [
        {
          cells: initialBoard,
          turn: "b",
        },
      ],
      playerColor: "b",
      latestMove: { x: 2, y: 2 },
    };

    const expectedProps = {
      cells: initialBoard,
      turn: "b",
      status: "normal",
      black: 2,
      white: 2,
      playerColor: "b",
      latestMove: { x: 2, y: 2 },
    };

    const props = mapStateToProps(state);

    expect(props).toEqual(expectedProps);
  });
});

describe("mapDispatchToProps", () => {
  it("should dispatch clickCell action", () => {
    const place = { x: 1, y: 2 };
    const dispatch = vi.fn();
    const props = mapDispatchToProps(dispatch);

    props.onClickCell(place);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({ type: "click_cell", place });
  });

  it("should dispatch clickPrev action", () => {
    const dispatch = vi.fn();
    const props = mapDispatchToProps(dispatch);

    props.onClickPrev();

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({ type: "click_prev" });
  });

  it("should dispatch clickPass action", () => {
    const dispatch = vi.fn();
    const props = mapDispatchToProps(dispatch);

    props.onClickPass();

    expect(dispatch).toHaveBeenCalledWith({ type: "click_pass" });
  });

  it("should dispatch aiMove action", () => {
    const dispatch = vi.fn();
    const props = mapDispatchToProps(dispatch);

    props.launchAi();

    expect(dispatch).toHaveBeenCalledWith({ type: "launch_ai" });
  });
});
