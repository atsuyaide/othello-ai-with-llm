import { describe, expect, it } from "vitest";
import { initialBoard } from "../constants";
import { GameState } from "../containers/Game";
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

    const expectedState = {
      positions: [
        {
          cells: initialBoard,
          turn: "w",
        },
      ],
      latestMove: { x: 2, y: 2 },
      playerColor: "w",
    };

    const newState = move(initialState, { x: 2, y: 2 });

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
