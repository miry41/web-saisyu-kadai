import { BOARD_HEIGHT, BOARD_WIDTH } from "@/tetris/constants";
import type { Board, GroupBoard, RotationDir } from "@/tetris/types";

export function rotateBoard90(board: Board, dir: RotationDir): Board {
  const next: Board = Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => 0 as Board[number][number]),
  );

  for (let y = 0; y < BOARD_HEIGHT; y += 1) {
    for (let x = 0; x < BOARD_WIDTH; x += 1) {
      const value = board[y][x];
      if (dir === "cw") {
        next[x][BOARD_HEIGHT - 1 - y] = value;
      } else {
        next[BOARD_WIDTH - 1 - x][y] = value;
      }
    }
  }

  return next;
}

export function rotateGroupBoard90(groupBoard: GroupBoard, dir: RotationDir): GroupBoard {
  const next: GroupBoard = Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => 0),
  );

  for (let y = 0; y < BOARD_HEIGHT; y += 1) {
    for (let x = 0; x < BOARD_WIDTH; x += 1) {
      const value = groupBoard[y][x];
      if (dir === "cw") {
        next[x][BOARD_HEIGHT - 1 - y] = value;
      } else {
        next[BOARD_WIDTH - 1 - x][y] = value;
      }
    }
  }

  return next;
}
