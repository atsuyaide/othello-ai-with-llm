import * as _ from "lodash";
import { describe, expect, it } from "vitest";
import { initialBoard } from "../constants";
import { GameState } from "../containers/Game";
import { CellState } from "../types";
import { move } from "./index";

describe("move", () => {
  it("should return the updated game state when a valid move is made", () => {
    const initialState: GameState = {
      positions: [
        {
          cells: initialBoard,
          turn: "b",
        },
      ],
      latestMove: undefined,
      playerColor: "b",
    };

    const expectedBoard: CellState[] = _.flatten(
      [
        "........",
        "........",
        "........",
        "...wb...",
        "...bbb..",
        "........",
        "........",
        "........",
      ].map((r) => r.split("") as CellState[])
    );
    const expectedState = {
      positions: [
        {
          cells: initialBoard,
          turn: "b",
        },
        {
          cells: expectedBoard,
          turn: "w",
        },
      ],
      latestMove: { x: 5, y: 4 },
      playerColor: "b",
    };

    const newState = move(initialState, { x: 5, y: 4 });

    expect(newState).toEqual(expectedState);
  });

  // it("should return the same game state when an invalid move is made", () => {
  //   const initialState = {
  //     positions: [
  //       {
  //         cells: [
  //           ["", "", ""],
  //           ["", "b", ""],
  //           ["", "", ""],
  //         ],
  //         turn: "b",
  //       },
  //     ],
  //     latestMove: undefined,
  //   };

  //   const newState = move(initialState, { x: 0, y: 0 });

  //   expect(newState).toEqual(initialState);
  // });

  // it("should return the updated game state when no move is provided", () => {
  //   const initialState = {
  //     positions: [
  //       {
  //         cells: [
  //           ["", "", ""],
  //           ["", "b", ""],
  //           ["", "", ""],
  //         ],
  //         turn: "b",
  //       },
  //     ],
  //     latestMove: undefined,
  //   };

  //   const expectedState = {
  //     positions: [
  //       {
  //         cells: [
  //           ["", "", ""],
  //           ["", "b", ""],
  //           ["", "", ""],
  //         ],
  //         turn: "w",
  //       },
  //     ],
  //     latestMove: undefined,
  //   };

  //   const newState = move(initialState);

  //   expect(newState).toEqual(expectedState);
  // });
});
