import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Cell } from "./Cell";

describe("Cell", () => {
  it("renders correctly", () => {
    const onClickMock = vi.fn();
    const { container } = render(
      <Cell
        place={{ x: 1, y: 2 }}
        state="b"
        highlight={false}
        onClick={onClickMock}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("calls onClick function when clicked", () => {
    const onClickMock = vi.fn();
    const { container } = render(
      <Cell
        place={{ x: 1, y: 2 }}
        state="w"
        highlight={true}
        onClick={onClickMock}
      />
    );

    expect(container.firstChild).not.toBeNull();
    const firstChild = container.firstChild as Element;
    fireEvent.click(firstChild);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders null when state is '.'", () => {
    const onClickMock = vi.fn();
    const { container } = render(
      <Cell
        place={{ x: 1, y: 2 }}
        state="."
        highlight={false}
        onClick={onClickMock}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders black stone when state is 'b'", () => {
    const onClickMock = vi.fn();
    const { container } = render(
      <Cell
        place={{ x: 1, y: 2 }}
        state="b"
        highlight={false}
        onClick={onClickMock}
      />
    );

    expect(container.firstChild).toContainHTML(
      '<span style="color: black;"></span>'
    );
  });

  // it("renders white stone when state is 'w'", () => {
  //   const onClickMock = vi.fn();
  //   const { container } = render(
  //     <Cell
  //       place={{ x: 1, y: 2 }}
  //       state="w"
  //       highlight={false}
  //       onClick={onClickMock}
  //     />
  //   );

  //   expect(container.firstChild).toContainHTML(
  //     '<span style="color: white;"></span>'
  //   );
  // });

  // it("renders movable style when state is '*'", () => {
  //   const onClickMock = vi.fn();
  //   const { container } = render(
  //     <Cell
  //       place={{ x: 1, y: 2 }}
  //       state="*"
  //       highlight={false}
  //       onClick={onClickMock}
  //     />
  //   );

  //   expect(container.firstChild).toContainHTML(
  //     '<span style="border: 2px solid red;"></span>'
  //   );
  // });
});
