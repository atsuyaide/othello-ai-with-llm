// 盤面上の位置を表す型. x, y はそれぞれ横, 縦の位置を表す.
// {x: 0, y: 0} が左上の位置を表す.
// {x: 5, y: 4} がf5の位置を表す.
export interface Place {
  x: number; // 横 a, b, c, d, e, f, g, h に対応する.
  y: number; // 縦 1, 2, 3, 4, 5, 6, 7, 8 に対応する.
}

export type CellState = "." | "b" | "w" | "*";
export type Color = "b" | "w";
