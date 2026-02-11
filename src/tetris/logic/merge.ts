import { getPieceCells } from "@/tetris/pieces";
import type { Board, CellValue, GroupBoard, Piece } from "@/tetris/types";

const PIECE_VALUE: Record<Piece["kind"], CellValue> = {
  I: 1,
  O: 2,
  T: 3,
  S: 4,
  Z: 5,
  J: 6,
  L: 7,
};

export function mergePieceWithGroup(
  board: Board,
  piece: Piece,
  groupBoard: GroupBoard,
  groupId: number,
): { board: Board; groupBoard: GroupBoard } {
  const nextBoard = board.map((row) => [...row]);
  const nextGroupBoard = groupBoard.map((row) => [...row]);
  const pieceValue = PIECE_VALUE[piece.kind];

  for (const [dx, dy] of getPieceCells(piece.kind, piece.rotation)) {
    const x = piece.x + dx;
    const y = piece.y + dy;
    nextBoard[y][x] = pieceValue;
    nextGroupBoard[y][x] = groupId;
  }

  return { board: nextBoard, groupBoard: nextGroupBoard };
}
