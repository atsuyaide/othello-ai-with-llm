import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Control } from "./Control";

describe("Control", () => {
  it("renders correctly", () => {
    const onClickPrevMock = vi.fn();
    const onClickPassMock = vi.fn();
    const { container } = render(
      <Control
        black={2}
        white={3}
        onClickPrev={onClickPrevMock}
        onClickPass={onClickPassMock}
        shouldPass={true}
      />
    );

    // snapshotと比較して意図しない要素の変更がないか確認
    expect(container.firstChild).toMatchSnapshot();
  });

  it("calls onClickPrev function when Prev is clicked", () => {
    const onClickPrevMock = vi.fn();
    const onClickPassMock = vi.fn();
    render(
      <Control
        black={2}
        white={3}
        onClickPrev={onClickPrevMock}
        onClickPass={onClickPassMock}
        shouldPass={true}
      />
    );

    const prevButton = screen.getByText("Prev");
    fireEvent.click(prevButton);

    expect(onClickPrevMock).toHaveBeenCalledTimes(1);
  });

  it("calls onClickPass function when Pass is clicked", () => {
    const onClickPrevMock = vi.fn();
    const onClickPassMock = vi.fn();
    render(
      <Control
        black={2}
        white={3}
        onClickPrev={onClickPrevMock}
        onClickPass={onClickPassMock}
        shouldPass={true}
      />
    );

    const passButton = screen.getByText("Pass");
    fireEvent.click(passButton);

    expect(onClickPassMock).toHaveBeenCalledTimes(1);
  });

  it("renders Pass button as disabled when shouldPass is false", () => {
    const onClickPrevMock = vi.fn();
    const onClickPassMock = vi.fn();
    render(
      <Control
        black={2}
        white={3}
        onClickPrev={onClickPrevMock}
        onClickPass={onClickPassMock}
        shouldPass={false}
      />
    );

    const passButton = screen.getByText("Pass");
    expect(passButton).toHaveClass("disabled");
  });
});
