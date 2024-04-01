import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Cell } from "./Cell";

describe("Cell", () => {
  it("renders correctly", () => {
    const onClickMock = vi.fn();
    const { container } = render(
      <Cell
        place={{ x: 1, y: 1 }}
        state="b"
        highlight={false}
        onClick={onClickMock}
      />
    );

    // snapshotと比較して意図しない要素の変更がないか確認
    expect(container.firstChild).toMatchSnapshot();
  });

  it("calls onClick function when clicked", () => {
    const onClickMock = vi.fn();
    render(
      <Cell
        place={{ x: 1, y: 1 }}
        state="w"
        highlight={true}
        onClick={onClickMock}
      />
    );

    const cell = screen.getByTestId("cell");
    fireEvent.click(cell);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders null when state is '.'", () => {
    const onClickMock = vi.fn();
    const { container } = render(
      <Cell
        place={{ x: 1, y: 1 }}
        state="."
        highlight={false}
        onClick={onClickMock}
      />
    );

    const cell = container.firstChild as Element;
    const cellStyle = window.getComputedStyle(cell);

    expect(cell).not.toBeNull();
    expect(cell?.nodeName).equal("DIV");
    expect(cellStyle.getPropertyValue("background-color")).equal(
      "rgb(0, 153, 0)" // = #009900
    );
  });

  it("renders black stone when state is 'b'", () => {
    const onClickMock = vi.fn();
    render(
      <Cell
        place={{ x: 1, y: 1 }}
        state="b"
        highlight={false}
        onClick={onClickMock}
      />
    );

    const stone = screen.getByTestId("stone");
    const stoneStyle = window.getComputedStyle(stone);

    expect(stoneStyle.getPropertyValue("border-radius")).equal("40px");
    expect(stoneStyle.getPropertyValue("background-color")).equal(
      "rgb(32, 39, 32)"
    );
  });

  it("renders white stone when state is 'w'", () => {
    const onClickMock = vi.fn();
    render(
      <Cell
        place={{ x: 1, y: 1 }}
        state="w"
        highlight={false}
        onClick={onClickMock}
      />
    );
    const stone = screen.getByTestId("stone");
    const stoneStyle = window.getComputedStyle(stone);

    expect(stoneStyle.getPropertyValue("border-radius")).equal("40px");
    expect(stoneStyle.getPropertyValue("background-color")).equal(
      "rgb(255, 255, 255)"
    );
  });

  it("renders movable style when state is '*'", () => {
    const onClickMock = vi.fn();
    render(
      <Cell
        place={{ x: 1, y: 1 }}
        state="*"
        highlight={false}
        onClick={onClickMock}
      />
    );
    const marker = screen.getByTestId("marker");
    const markerStyle = window.getComputedStyle(marker);

    expect(markerStyle.getPropertyValue("border-radius")).equal("4px");
    expect(markerStyle.getPropertyValue("background-color")).equal(
      "rgb(85, 85, 85)"
    );
  });
});
