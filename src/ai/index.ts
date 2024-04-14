import { evaluate } from "@app/ai/eval";
import { Board, reverse, stones } from "@app/bitboard/Board";
import * as Move from "@app/bitboard/move";
import * as _ from "lodash";

const FullSearchCount = 12;
const MinScore = -10000;
const MaxScore = 10000;
const TimeoutMS = 500;

export interface MoveScore {
  score: number;
  place: { x: number; y: number };
}

export interface Place {
  x: number;
  y: number;
}

/**
 * AIの実行関数です。
 *
 * @param board オセロの盤面
 * @returns 各手のスコアの配列
 */
export function run(board: Board): MoveScore[] {
  // 盤面の石の数がFullSearchCount以下の場合はフルサーチ
  if (64 - board.stones <= FullSearchCount) return fullSearch(board);
  // それ以外の場合は反復深化探索
  return iterativeDeepning(board);
}

/**
 * 深さ優先探索を用いて、指定されたボードの評価値のリストを返す関数です。
 *
 * @param board ボードの状態
 * @returns 評価値のリスト
 */
export function iterativeDeepning(board: Board): MoveScore[] {
  console.log("iterative deepning");
  const movables = Move.movables(board);
  const timelimit = Date.now() + TimeoutMS;
  let scores: MoveScore[] = [];

  for (let depth = 3; ; depth++) {
    try {
      scores = movables.map((place) => ({
        score: -alphaBetaEval(
          reverse(Move.move(board, place.x, place.y)),
          depth - 1,
          -MaxScore,
          -MinScore,
          timelimit
        ),
        place,
      }));
    } catch {
      console.log(`depth: ${depth}`);
      break;
    }
  }
  return _.sortBy(scores, (s) => -s.score);
}

/**
 * alphaBetaEval関数は、アルファベータ法を使用して盤面の評価値を計算します。
 *
 * @param board 盤面の状態
 * @param depth 探索の深さ
 * @param a アルファ値
 * @param b ベータ値
 * @param tl 制限時間
 * @returns 評価値
 * @throws "tle" 制限時間を超過した場合にスローされます
 */
function alphaBetaEval(
  board: Board,
  depth: number,
  a: number,
  b: number,
  tl: number
): number {
  if (Date.now() > tl) throw "tle";
  if (depth <= 0) return evaluate(board);
  const movables = Move.movables(board);
  if (movables.length == 0)
    return -alphaBetaEval(reverse(board), depth - 1, -b, -a, tl);
  for (const move of movables) {
    const next = reverse(Move.move(board, move.x, move.y));
    a = _.max([a, -alphaBetaEval(next, depth - 1, -b, -a, tl)]) as number;
    if (a >= b) return a;
  }
  return a;
}

/**
 * ボードをフルサーチして、可能な手のスコアを返す関数です。
 *
 * @param board ボードの状態
 * @returns スコアと手の配列
 */
function fullSearch(board: Board): MoveScore[] {
  console.log("full search");
  const movables = Move.movables(board);
  const scores = movables.map((place) => ({
    score: -alphaBetaFull(
      reverse(Move.move(board, place.x, place.y)),
      0,
      -MaxScore,
      -MinScore
    ),
    place,
  }));
  return _.sortBy(scores, (s) => -s.score);
}

/**
 * alphaBetaFull関数は、アルファベータ法を使用してオセロのAIの評価値を計算します。
 *
 * @param board オセロの盤面
 * @param passes パスの回数
 * @param a アルファ値
 * @param b ベータ値
 * @returns 評価値
 */
function alphaBetaFull(
  board: Board,
  passes: number,
  a: number,
  b: number
): number {
  // 盤面の石の数が64の場合は、石の数の差を返す
  const [black, white] = stones(board);
  if (board.stones == 64) return black - white;

  const movables = Move.movables(board);
  // 手がなく、パスの回数が1回以上の場合は、石の数の差を返す
  if (movables.length == 0 && passes > 0) return black - white;
  // 手がなく、パスの回数が0回の場合は、相手の手番で再帰的に評価値を計算
  if (movables.length == 0)
    return -alphaBetaFull(reverse(board), passes + 1, -b, -a);
  for (const move of movables) {
    const nextDesc = reverse(Move.move(board, move.x, move.y));
    a = _.max([a, -alphaBetaFull(nextDesc, passes, -b, -a)]) as number;
    if (a >= b) return a;
  }
  // すべての手を試した後は、アルファ値を返す
  return a;
}
