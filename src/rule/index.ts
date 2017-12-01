import { GameDescription, fromUiState, toUiState, octetCellsToCells } from "GameDescription"
import { BitBoard } from "BitBoard"
import * as UiTypes from "ui/types"

export function canMove(desc: GameDescription, x: number, y: number): boolean {
    // row
    if (BitBoard[desc.rows[y]][x]) return true
    // col
    if (BitBoard[desc.cols[x]][y]) return true
    // diagR
    const diagR = desc.diagsR[x + y]
    if (x + y < 8) {
        // seg1
        if (BitBoard[diagR][x]) return true
    } else {
        // seg2
        if (BitBoard[diagR][7 - y]) return true
    }
    // diagL
    const rx = 7 - x
    const diagL = desc.diagsL[rx + y]
    if (rx + y < 8) {
        // seg1
        if (BitBoard[diagL][rx]) return true
    } else {
        // seg2
        if (BitBoard[diagL][7 - y]) return true
    }
    return false
}

export function move(desc: GameDescription, x: number, y: number): GameDescription {
    const cells = toUiState(desc, "b")
    // row
    const nextRow = BitBoard[desc.rows[y]][x]
    if (nextRow) {
        octetCellsToCells(nextRow)
            .forEach((cell, ix) => {
                cells[8 * y + ix] = cell as UiTypes.CellState
            })
    }
    // col
    const nextCol = BitBoard[desc.cols[x]][y]
    if (nextCol) {
        octetCellsToCells(nextCol)
            .forEach((cell, iy) => {
                cells[8 * iy + x] = cell as UiTypes.CellState
            })
    }
    // diagR
    const diagR = desc.diagsR[x + y]
    if (x + y < 8) {
        // seg1
        const nextDiag = BitBoard[diagR][x]
        if (nextDiag) {
            octetCellsToCells(nextDiag)
                .forEach((cell, ix) => {
                    const iy = (x + y) - ix
                    if (iy < 0) return
                    cells[8 * iy + ix] = cell as UiTypes.CellState
                })
        }
    } else {
        // seg2
        const nextDiag = BitBoard[diagR][7 - y]
        if (nextDiag) {
            octetCellsToCells(nextDiag)
                .forEach((cell, i) => {
                    const ix = (x + y - 7) + i
                    const iy = 7 - i
                    if (ix > 7) return
                    cells[8 * iy + ix] = cell as UiTypes.CellState
                })
        }
    }
    // diagL
    const rx = 7 - x
    const diagL = desc.diagsL[rx + y]
    if (rx + y < 8) {
        // seg1
        const nextDiag = BitBoard[diagL][rx]
        if (nextDiag) {
            octetCellsToCells(nextDiag)
                .forEach((cell, ix) => {
                    const iy = (rx + y) - ix
                    if (iy < 0) return
                    cells[8 * iy + 7 - ix] = cell as UiTypes.CellState
                })
        }
    } else {
        // seg2
        const nextDiag = BitBoard[diagL][7 - y]
        if (nextDiag) {
            octetCellsToCells(nextDiag)
                .forEach((cell, i) => {
                    const ix = (rx + y - 7) + i
                    const iy = 7 - i
                    if (ix > 7) return
                    cells[8 * iy + 7 - ix] = cell as UiTypes.CellState
                })
        }
    }

    // TODO: たぶんdescに変換する処理を飛ばせる
    return fromUiState({ turn: "b", cells })
}