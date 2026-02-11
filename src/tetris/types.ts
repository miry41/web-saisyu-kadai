export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Board = CellValue[][];
export type GroupId = number;
export type GroupBoard = GroupId[][];

export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
export type Rotation = 0 | 1 | 2 | 3;
export type RotationDir = "cw" | "ccw";
export type GamePhase = "playing" | "locking" | "rotating" | "gameover";
export type RotateStage = "none" | "announce" | "animating" | "linger" | "falling";

export type Piece = {
  kind: TetrominoType;
  rotation: Rotation;
  x: number;
  y: number;
};

export type RngState = {
  seed: number;
};

export type GameState = {
  board: Board;
  boardGroups: GroupBoard;
  nextGroupId: number;
  currentPiece: Piece;
  nextPiece: Piece;
  holdPieceKind: TetrominoType | null;
  canHold: boolean;
  phase: GamePhase;
  paused: boolean;
  score: number;
  totalClearedLines: number;
  rng: RngState;
  elapsedMs: number;
  nextRotateAtMs: number;
  dropAccumulatorMs: number;
  rotateAccumulatorMs: number;
  lastRotateDir: RotationDir | null;
  rotateStage: RotateStage;
  rotateStageRemainingMs: number;
  pendingRotatedBoard: Board | null;
  pendingRotatedGroups: GroupBoard | null;
  softDropRequested: boolean;
  softDropHoldMs: number;
  softDropActive: boolean;
};
