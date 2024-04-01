import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { initialBoard } from "../constants";
import Main, { MainProps } from "./Main";

describe("Main", () => {
  it("renders correctly", () => {
    const props: MainProps = {
      cells: initialBoard,
      latestMove: undefined,
      turn: "b",
      onClickCell: vi.fn(),
      onClickPass: vi.fn(),
      onClickPrev: vi.fn(),
      launchAi: vi.fn(),
      status: "normal",
      playerColor: "b",
      black: 2,
      white: 2,
    };

    render(<Main {...props} />);

    // Assert that the main component is rendered correctly
    const mainComponent = screen.getByTestId("main-component");
    expect(mainComponent).toBeInTheDocument();

    // Assert that the board component is rendered correctly
    const boardComponent = screen.getByTestId("board-component");
    expect(boardComponent).toBeInTheDocument();

    // Assert that the control component is rendered correctly
    const controlComponent = screen.getByTestId("control-component");
    expect(controlComponent).toBeInTheDocument();
  });

  it("calls launchAi function when it's not the player's turn", () => {
    vi.useFakeTimers();
    const launchAiMock = vi.fn();
    const props: MainProps = {
      cells: initialBoard,
      latestMove: undefined,
      turn: "b",
      onClickCell: vi.fn(),
      onClickPass: vi.fn(),
      onClickPrev: vi.fn(),
      launchAi: launchAiMock,
      status: "normal",
      playerColor: "w",
      black: 2,
      white: 2,
    };

    render(<Main {...props} />);
    vi.advanceTimersByTime(200);

    // Assert that the launchAi function is called
    expect(launchAiMock).toHaveBeenCalledOnce();

    // テストの後処理で偽のタイマーをクリーンアップ
    afterEach(() => {
      vi.clearAllTimers();
    });
  });
});
