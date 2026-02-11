import type { Piece, Rotation, RotationDir } from "@/tetris/types";

function normalizeRotation(value: number): Rotation {
  const normalized = ((value % 4) + 4) % 4;
  return normalized as Rotation;
}

export function rotatePiece(piece: Piece, dir: RotationDir): Piece {
  const delta = dir === "cw" ? 1 : -1;
  return {
    ...piece,
    rotation: normalizeRotation(piece.rotation + delta),
  };
}
