import { BOARD_HEIGHT, BOARD_WIDTH } from "@/tetris/constants";
import type { Board, CellValue, GroupBoard } from "@/tetris/types";

export function clearLinesWithGroups(
  board: Board,
  groupBoard: GroupBoard,
): { board: Board; groupBoard: GroupBoard; clearedLines: number } {
  const keepRows: number[] = [];
  for (let y = 0; y < BOARD_HEIGHT; y += 1) {
    const filled = board[y].every((cell) => cell !== 0);
    if (!filled) {
      keepRows.push(y);
    }
  }

  const clearedLines = BOARD_HEIGHT - keepRows.length;
  if (clearedLines <= 0) {
    return { board, groupBoard, clearedLines: 0 };
  }

  const emptyBoardRow: CellValue[] = Array.from({ length: BOARD_WIDTH }, () => 0);
  const emptyGroupRow: number[] = Array.from({ length: BOARD_WIDTH }, () => 0);
  const compactBoard = keepRows.map((rowIndex) => [...board[rowIndex]]);
  const compactGroups = keepRows.map((rowIndex) => [...groupBoard[rowIndex]]);

  const nextBoard = Array.from({ length: clearedLines }, () => [...emptyBoardRow]).concat(compactBoard);
  const nextGroupBoard = Array.from({ length: clearedLines }, () => [...emptyGroupRow]).concat(compactGroups);

  return { board: nextBoard, groupBoard: nextGroupBoard, clearedLines };
}
