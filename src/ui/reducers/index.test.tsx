import * as Action from "@app/ui/actions";
import { initialBoard } from "@app/ui/constants";
import { GameState } from "@app/ui/containers/Game";
import { move, reducers } from "@app/ui/reducers";
import { CellState } from "@app/ui/types";
import * as _ from "lodash";
import { describe, expect, it } from "vitest";

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

  it("should return the same game state when an invalid move is made", () => {
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

    const newState = move(initialState, { x: 0, y: 0 });

    expect(newState).toEqual(initialState);
  });

  it("should return the updated game state when no move is provided", () => {
    const canNotMoveBoard: CellState[] = _.flatten(
      [
        "........",
        "........",
        "........",
        "...ww...",
        "...ww...",
        "........",
        "........",
        "........",
      ].map((r) => r.split("") as CellState[])
    );
    const initialState: GameState = {
      positions: [
        {
          cells: canNotMoveBoard,
          turn: "b",
        },
      ],
      latestMove: undefined,
      playerColor: "b",
    };

    const expectedState: GameState = {
      positions: [
        {
          cells: canNotMoveBoard,
          turn: "b",
        },
        {
          cells: canNotMoveBoard,
          turn: "w",
        },
      ],
      latestMove: undefined,
      playerColor: "b",
    };

    const newState = move(initialState);

    expect(newState).toEqual(expectedState);
  });
});

describe("reducers", () => {
  it("should handle click_cell action when it is the player's turn", () => {
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
    const action = Action.clickCell({ x: 5, y: 4 });

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
    const newState = reducers(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should handle click_pass action when it is the player's turn", () => {
    const canNotMoveBoard: CellState[] = _.flatten(
      [
        "........",
        "........",
        "........",
        "...ww...",
        "...ww...",
        "........",
        "........",
        "........",
      ].map((r) => r.split("") as CellState[])
    );
    const initialState: GameState = {
      positions: [
        {
          cells: canNotMoveBoard,
          turn: "b",
        },
      ],
      latestMove: undefined,
      playerColor: "b",
    };
    const action = Action.clickPass;

    const expectedState: GameState = {
      positions: [
        {
          cells: canNotMoveBoard,
          turn: "b",
        },
        {
          cells: canNotMoveBoard,
          turn: "w",
        },
      ],
      latestMove: undefined,
      playerColor: "b",
    };

    const newState = reducers(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should handle launch_ai action when it is not the player's turn", () => {
    const mockBoard: CellState[] = _.flatten(
      [
        "........",
        "........",
        "........",
        "........",
        "...wb...",
        "........",
        "........",
        "........",
      ].map((r) => r.split("") as CellState[])
    );
    const initialState: GameState = {
      positions: [
        {
          cells: mockBoard,
          turn: "w",
        },
      ],
      latestMove: undefined,
      playerColor: "b",
    };
    const action = Action.aiMove;

    const expectedBoard: CellState[] = _.flatten(
      [
        "........",
        "........",
        "........",
        "........",
        "...www..",
        "........",
        "........",
        "........",
      ].map((r) => r.split("") as CellState[])
    );
    const expectedState = {
      positions: [
        {
          cells: mockBoard,
          turn: "w",
        },
        {
          cells: expectedBoard,
          turn: "b",
        },
      ],
      latestMove: { x: 5, y: 4 },
      playerColor: "b",
    };

    const newState = reducers(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should handle click_prev action", () => {
    const secondBoard: CellState[] = _.flatten(
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
    const thirdBoard: CellState[] = _.flatten(
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
    const initialState: GameState = {
      positions: [
        {
          cells: initialBoard,
          turn: "b",
        },
        {
          cells: secondBoard,
          turn: "w",
        },
        {
          cells: thirdBoard,
          turn: "b",
        },
      ],
      latestMove: { x: 5, y: 4 },
      playerColor: "b",
    };
    const action = Action.clickPrev;

    const expectedState: GameState = {
      positions: [
        {
          cells: initialBoard,
          turn: "b",
        },
      ],
      latestMove: undefined,
      playerColor: "b",
    };

    const newState = reducers(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
