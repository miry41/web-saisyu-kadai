import { SPAWN_X, SPAWN_Y } from "@/tetris/constants";
import { SHAPES } from "@/tetris/piecesData";
import type { Piece, Rotation, TetrominoType } from "@/tetris/types";

export const PIECE_TYPES: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];

export function getPieceCells(kind: TetrominoType, rotation: Rotation): ReadonlyArray<readonly [number, number]> {
  return SHAPES[kind][rotation];
}

export function createPiece(kind: TetrominoType): Piece {
  return {
    kind,
    rotation: 0,
    x: SPAWN_X,
    y: SPAWN_Y,
  };
}
