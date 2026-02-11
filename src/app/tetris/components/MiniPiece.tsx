import { CELL_COLORS } from "@/tetris/constants";
import { getPieceCells } from "@/tetris/pieces";
import type { Piece, TetrominoType } from "@/tetris/types";

function pieceKindToCellValue(kind: TetrominoType): keyof typeof CELL_COLORS {
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

export function MiniPiece({ piece }: { piece: Piece | null }) {
  if (!piece) {
    return <p className="text-xs text-zinc-500">Empty</p>;
  }

  const rawCells = getPieceCells(piece.kind, 0).map(([x, y]) => ({ x, y }));
  const minX = Math.min(...rawCells.map((cell) => cell.x));
  const maxX = Math.max(...rawCells.map((cell) => cell.x));
  const minY = Math.min(...rawCells.map((cell) => cell.y));
  const maxY = Math.max(...rawCells.map((cell) => cell.y));
  const normalizedCells = rawCells.map((cell) => ({ x: cell.x - minX, y: cell.y - minY }));
  const pieceValue = pieceKindToCellValue(piece.kind);
  const cellSize = 22;

  return (
    <div className="relative" style={{ width: (maxX - minX + 1) * cellSize, height: (maxY - minY + 1) * cellSize }}>
      {normalizedCells.map((cell) => (
        <div
          key={`mini-${piece.kind}-${cell.x}-${cell.y}`}
          className="absolute rounded-sm border border-zinc-800"
          style={{
            width: cellSize,
            height: cellSize,
            left: cell.x * cellSize,
            top: cell.y * cellSize,
            backgroundColor: CELL_COLORS[pieceValue],
          }}
        />
      ))}
    </div>
  );
}
