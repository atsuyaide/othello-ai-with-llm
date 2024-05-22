import { fromUiState } from "@app/bitboard/Board";
import { initialBoard } from "@app/ui/constants";
import { describe, expect, it } from "vitest";
import { iterativeDeepning } from "./index";

describe("iterativeDeepning", () => {
  it("should return an array of MoveScore objects sorted by score in descending order", () => {
    // Arrange
    const board = fromUiState(initialBoard);

    // Act
    const result = iterativeDeepning(board);
    console.log(result);

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("score");
    expect(result[0]).toHaveProperty("place");
    expect(result).toEqual(
      expect.arrayContaining(result.sort((a, b) => b.score - a.score))
    );
  });
});
