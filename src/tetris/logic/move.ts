import { canPlace } from "@/tetris/logic/collide";
import { rotatePiece } from "@/tetris/logic/rotatePiece";
import type { Board, Piece, RotationDir } from "@/tetris/types";

const SIMPLE_WALL_KICK_OFFSETS = [0, -1, 1, -2, 2];

export function movePiece(board: Board, piece: Piece, dx: number, dy: number): Piece {
  const candidate = {
    ...piece,
    x: piece.x + dx,
    y: piece.y + dy,
  };

  return canPlace(board, candidate) ? candidate : piece;
}

export function rotatePieceOnBoard(board: Board, piece: Piece, dir: RotationDir): Piece {
  const rotated = rotatePiece(piece, dir);

  for (const kickX of SIMPLE_WALL_KICK_OFFSETS) {
    const candidate = { ...rotated, x: rotated.x + kickX };
    if (canPlace(board, candidate)) {
      return candidate;
    }
  }

  return piece;
}

export function hardDropPiece(board: Board, piece: Piece): Piece {
  let dropped = piece;
  while (true) {
    const next = { ...dropped, y: dropped.y + 1 };
    if (!canPlace(board, next)) {
      return dropped;
    }
    dropped = next;
  }
}
