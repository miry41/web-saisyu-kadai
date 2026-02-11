import { BLOCK_SIZE_PX, BOARD_HEIGHT, BOARD_WIDTH, CELL_COLORS } from "@/tetris/constants";
import { getPieceCells } from "@/tetris/pieces";
import type { Board, Piece } from "@/tetris/types";

type DrawParams = {
  ctx: CanvasRenderingContext2D;
  board: Board;
  currentPiece: Piece | null;
};

export function getCanvasSize(): { width: number; height: number } {
  return {
    width: BOARD_WIDTH * BLOCK_SIZE_PX,
    height: BOARD_HEIGHT * BLOCK_SIZE_PX,
  };
}

export function drawGame({ ctx, board, currentPiece }: DrawParams): void {
  const { width, height } = getCanvasSize();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, width, height);

  for (let y = 0; y < BOARD_HEIGHT; y += 1) {
    for (let x = 0; x < BOARD_WIDTH; x += 1) {
      drawCell(ctx, x, y, board[y][x]);
    }
  }

  if (currentPiece) {
    const value = currentPieceToCellValue(currentPiece.kind);
    for (const [dx, dy] of getPieceCells(currentPiece.kind, currentPiece.rotation)) {
      drawCell(ctx, currentPiece.x + dx, currentPiece.y + dy, value);
    }
  }
}

function drawCell(ctx: CanvasRenderingContext2D, x: number, y: number, value: keyof typeof CELL_COLORS): void {
  const px = x * BLOCK_SIZE_PX;
  const py = y * BLOCK_SIZE_PX;

  ctx.fillStyle = CELL_COLORS[value];
  ctx.fillRect(px, py, BLOCK_SIZE_PX, BLOCK_SIZE_PX);

  ctx.strokeStyle = "rgba(148,163,184,0.25)";
  ctx.strokeRect(px + 0.5, py + 0.5, BLOCK_SIZE_PX - 1, BLOCK_SIZE_PX - 1);
}

function currentPieceToCellValue(kind: Piece["kind"]): keyof typeof CELL_COLORS {
  switch (kind) {
    case "I":
      return 1;
    case "O":
      return 2;
    case "T":
      return 3;
    case "S":
      return 4;
    case "Z":
      return 5;
    case "J":
      return 6;
    case "L":
      return 7;
  }
}
