import { CellState } from "@app/ui/types";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Board, BoardRow } from "./Board";

test("renders board with correct number of cells", () => {
  const onClickCell = vi.fn();
  const cells: CellState[] = Array(64).fill(".");
  render(<Board cells={cells} onClickCell={onClickCell} />);

  const cell = screen.getAllByTestId("cell");
  expect(cell).toHaveLength(64);
});

test("calls onClickCell when a cell is clicked", () => {
  const onClickCell = vi.fn();
  const cells = Array(64).fill(null);
  render(<Board cells={cells} onClickCell={onClickCell} />);

  const cell = screen.getAllByTestId("cell")[0];
  cell.click();

  expect(onClickCell).toHaveBeenCalledTimes(1);
});

test("renders board row with correct number of cells", () => {
  const onClickCell = vi.fn();
  const cells = Array(8).fill(".");
  render(<BoardRow cells={cells} onClickCell={onClickCell} rowIdx={0} />);

  const cell = screen.getAllByTestId("cell");
  expect(cell).toHaveLength(8);
});

test("calls onClickCell when a cell in a row is clicked", () => {
  const onClickCell = vi.fn();
  const cells = Array(8).fill(".");
  render(<BoardRow cells={cells} onClickCell={onClickCell} rowIdx={0} />);

  const cell = screen.getAllByTestId("cell")[0];
  cell.click();

  expect(onClickCell).toHaveBeenCalledTimes(1);
});
