import { BOARD_HEIGHT, BOARD_WIDTH } from "@/tetris/constants";
import type { Board, GroupBoard } from "@/tetris/types";

export function applyGravityDown(
  board: Board,
  groupBoard: GroupBoard,
): { board: Board; groupBoard: GroupBoard; moved: boolean } {
  const groups = new Map<number, Array<{ x: number; y: number; value: Board[number][number] }>>();

  for (let y = 0; y < BOARD_HEIGHT; y += 1) {
    for (let x = 0; x < BOARD_WIDTH; x += 1) {
      const groupId = groupBoard[y][x];
      if (groupId === 0 || board[y][x] === 0) {
        continue;
      }
      const cells = groups.get(groupId) ?? [];
      cells.push({ x, y, value: board[y][x] });
      groups.set(groupId, cells);
    }
  }

  const movableGroups: Array<{ groupId: number; cells: Array<{ x: number; y: number; value: Board[number][number] }> }> =
    [];

  for (const [groupId, cells] of groups.entries()) {
    const groupIndex = new Set(cells.map((cell) => cell.y * BOARD_WIDTH + cell.x));
    const canMove = cells.every((cell) => {
      const nextY = cell.y + 1;
      if (nextY >= BOARD_HEIGHT) {
        return false;
      }
      const belowIndex = nextY * BOARD_WIDTH + cell.x;
      return board[nextY][cell.x] === 0 || groupIndex.has(belowIndex);
    });

    if (canMove) {
      movableGroups.push({ groupId, cells });
    }
  }

  if (movableGroups.length === 0) {
    return { board, groupBoard, moved: false };
  }

  const nextBoard: Board = board.map((row) => [...row]);
  const nextGroups: GroupBoard = groupBoard.map((row) => [...row]);

  for (const group of movableGroups) {
    for (const cell of group.cells) {
      nextBoard[cell.y][cell.x] = 0;
      nextGroups[cell.y][cell.x] = 0;
    }
  }

  for (const group of movableGroups) {
    for (const cell of group.cells) {
      nextBoard[cell.y + 1][cell.x] = cell.value;
      nextGroups[cell.y + 1][cell.x] = group.groupId;
    }
  }

  return { board: nextBoard, groupBoard: nextGroups, moved: true };
}
