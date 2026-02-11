import { BOARD_HEIGHT, BOARD_WIDTH } from "@/tetris/constants";
import { getPieceCells } from "@/tetris/pieces";
import type { Board, Piece, Rotation } from "@/tetris/types";

type Position = { x: number; y: number };

export function canPlace(board: Board, piece: Piece, pos?: Position, rot?: Rotation): boolean {
  const nextX = pos?.x ?? piece.x;
  const nextY = pos?.y ?? piece.y;
  const nextRot = rot ?? piece.rotation;
  const cells = getPieceCells(piece.kind, nextRot);

  for (const [dx, dy] of cells) {
    const x = nextX + dx;
    const y = nextY + dy;

    if (x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT) {
      return false;
    }

    if (board[y][x] !== 0) {
      return false;
    }
  }

  return true;
}
