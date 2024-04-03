import { Board, flip } from "@app/bitboard/Board";
import { MoveTable, lookupMoveTable } from "@app/bitboard/MoveTable";
import * as UiTypes from "@app/ui/types";
import * as _ from "lodash";

/**
 * 指定されたボードの移動可能な場所を返します。
 * @param desc ボードの状態を表すデスクリプタ
 * @returns 移動可能な場所の配列
 */
export function movables(desc: Board): UiTypes.Place[] {
  return movableIndices(desc).map((i) => ({ x: i % 8, y: (i / 8) >> 0 }));
}

/**
 * 指定されたボードの移動可能なインデックスを返します。
 *
 * @param desc ボードの状態を表す配列
 * @returns 移動可能なインデックスの配列
 */
export function movableIndices(desc: Board): number[] {
  return _.range(8 * 8).filter((i) => canMove(desc, i % 8, (i / 8) >> 0));
}

/**
 * 行番号を三進数の数値に変換します。
 *
 * @param row 変換する行番号
 * @returns 変換された三進数の数値
 */
export function rowToTriplet(row: number): number {
  const cells = _.range(8).map((i) => (row >> ((7 - i) * 2)) & 0b11);
  return _.reduce(cells, (acc, c) => acc * 3 + c, 0);
}

/**
 * 指定された座標に駒を移動できるかどうかを判定します。
 *
 * @param desc ボードの状態を表すオブジェクト
 * @param x X座標
 * @param y Y座標
 * @returns 駒を移動できる場合はtrue、そうでない場合はfalse
 */
export function canMove(desc: Board, x: number, y: number): boolean {
  // row
  if (lookupMoveTable(desc.rows[y], x) != 0) return true;
  // col
  if (lookupMoveTable(desc.cols[x], y) != 0) return true;
  // diagR
  const diagR = desc.diagsR[x + y];
  if (x + y < 8) {
    // seg1
    if (lookupMoveTable(diagR, x) != 0) return true;
  } else {
    // seg2
    if (lookupMoveTable(diagR, 7 - y) != 0) return true;
  }
  // diagL
  const rx = 7 - x;
  const diagL = desc.diagsL[rx + y];
  if (rx + y < 8) {
    // seg1
    if (lookupMoveTable(diagL, rx) != 0) return true;
  } else {
    // seg2
    if (lookupMoveTable(diagL, 7 - y) != 0) return true;
  }
  return false;
}

/**
 * 盤面を更新して指定された位置に石を置く関数です。
 *
 * @param desc - 現在の盤面の状態
 * @param x - 石を置く位置のx座標
 * @param y - 石を置く位置のy座標
 * @returns 更新された盤面の状態
 */
export function move(desc: Board, x: number, y: number): Board {
  const next = _.cloneDeep(desc);
  // row
  const rowFlipped = MoveTable[desc.rows[y]][x];
  _.range(8).forEach((i) => {
    if ((rowFlipped & (1 << (7 - i))) == 0) return;
    flip(next, i, y);
  });

  // col
  const colFlipped = MoveTable[desc.cols[x]][y];
  _.range(8).forEach((i) => {
    if ((colFlipped & (1 << (7 - i))) == 0) return;
    flip(next, x, i);
  });

  // diagR
  const diagR = desc.diagsR[x + y];
  if (x + y < 8) {
    // seg1
    const diagFlipped = MoveTable[diagR][x];
    _.range(8).forEach((i) => {
      if ((diagFlipped & (1 << (7 - i))) == 0) return;
      const iy = x + y - i;
      flip(next, i, iy);
    });
  } else {
    // seg2
    const diagFlipped = MoveTable[diagR][7 - y];
    _.range(8).forEach((i) => {
      if ((diagFlipped & (1 << (7 - i))) == 0) return;
      const ix = x + y - 7 + i;
      const iy = 7 - i;
      flip(next, ix, iy);
    });
  }

  // diagL
  const rx = 7 - x;
  const diagL = desc.diagsL[rx + y];
  if (rx + y < 8) {
    // seg1
    const diagFlipped = MoveTable[diagL][rx];
    _.range(8).forEach((i) => {
      if ((diagFlipped & (1 << (7 - i))) == 0) return;
      const iy = rx + y - i;
      flip(next, 7 - i, iy);
    });
  } else {
    // seg2
    const diagFlipped = MoveTable[diagL][7 - y];
    _.range(8).forEach((i) => {
      if ((diagFlipped & (1 << (7 - i))) == 0) return;
      const ix = rx + y - 7 + i;
      const iy = 7 - i;
      flip(next, 7 - ix, iy);
    });
  }
  next.stones += 1;

  return next;
}
