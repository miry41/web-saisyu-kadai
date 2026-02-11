import { BOARD_HEIGHT, BOARD_WIDTH } from "@/tetris/constants";
import { createPiece, PIECE_TYPES } from "@/tetris/pieces";
import { nextRngInt } from "@/tetris/rng";
import type { Board, CellValue, GroupBoard, Piece, RngState } from "@/tetris/types";

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => 0 as CellValue),
  );
}

export function createEmptyGroupBoard(): GroupBoard {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => 0),
  );
}

export function spawnNext(rng: RngState): { piece: Piece; rng: RngState } {
  const result = nextRngInt(rng, PIECE_TYPES.length);
  return {
    piece: createPiece(PIECE_TYPES[result.value]),
    rng: result.rng,
  };
}
