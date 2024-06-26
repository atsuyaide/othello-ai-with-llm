import * as Board from "@app/bitboard/Board";
import * as Move from "@app/bitboard/move";

const k = 3;

/**
 * 盤面を評価してスコアを返す関数です。
 *
 * @param board 評価する盤面
 * @returns スコア
 */
export function evaluate(board: Board.Board): number {
  const rev = Board.reverse(board);
  const movablesScore =
    100 * (Move.movableIndices(board).length - Move.movableIndices(rev).length);
  const lineScore = k * (calcLineScore(board) - calcLineScore(rev));
  return movablesScore + lineScore;
}

/**
 * 盤面の行、列、対角線のスコアを計算する関数です。
 *
 * @param board 盤面オブジェクト
 * @returns スコアの合計値
 */
function calcLineScore(board: Board.Board): number {
  return [
    board.rows[0],
    board.rows[7],
    board.cols[0],
    board.cols[7],
    board.diagsL[7],
    board.diagsR[7],
  ]
    .map(rowScore)
    .reduce((acc, crr) => acc + crr, 0);
}

const LineScores = [
  ["xxx", 100],
  [".xx", 100],
  ["..x", 100],
  ["x.x", 100],
  ["x..", 10],
  ["...", 0],
  ["xx.", -50],
  [".x.", -50],
]
  .sort((a, b) => (a[0] > b[0] ? 1 : -1))
  .map((e) => e[1] as number);

function rowScore(row: Board.Row): number {
  let left = 0;
  if (((row >> 10) & 0b11) == 0) left = 1;
  left <<= 1;
  if (((row >> 12) & 0b11) == 0) left += 1;
  left <<= 1;
  if (((row >> 14) & 0b11) == 0) left += 1;

  let right = 0;
  if (((row >> 4) & 0b11) == 0) right = 1;
  right <<= 1;
  if (((row >> 2) & 0b11) == 0) right += 1;
  right <<= 1;
  if ((row & 0b11) == 0) right += 1;
  return LineScores[left] + LineScores[right];
}
