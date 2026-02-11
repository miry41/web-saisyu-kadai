import { INITIAL_NEXT_ROTATE_AT_MS } from "@/tetris/constants";
import { canPlace } from "@/tetris/logic/collide";
import { createEmptyBoard, createEmptyGroupBoard, spawnNext } from "@/tetris/logic/spawn";
import { createRng } from "@/tetris/rng";
import type { GameState } from "@/tetris/types";

const HYDRATION_SAFE_SEED = 0x1a2b3c4d;

export function createInitialGameState(seed = HYDRATION_SAFE_SEED): GameState {
  const board = createEmptyBoard();
  const boardGroups = createEmptyGroupBoard();
  const rng = createRng(seed >>> 0);
  const firstSpawn = spawnNext(rng);
  const secondSpawn = spawnNext(firstSpawn.rng);
  const canStart = canPlace(board, firstSpawn.piece);

  return {
    board,
    boardGroups,
    nextGroupId: 1,
    currentPiece: firstSpawn.piece,
    nextPiece: secondSpawn.piece,
    holdPieceKind: null,
    canHold: true,
    phase: canStart ? "playing" : "gameover",
    paused: false,
    score: 0,
    totalClearedLines: 0,
    rng: secondSpawn.rng,
    elapsedMs: 0,
    nextRotateAtMs: INITIAL_NEXT_ROTATE_AT_MS,
    dropAccumulatorMs: 0,
    rotateAccumulatorMs: 0,
    lastRotateDir: null,
    rotateStage: "none",
    rotateStageRemainingMs: 0,
    pendingRotatedBoard: null,
    pendingRotatedGroups: null,
    softDropRequested: false,
    softDropHoldMs: 0,
    softDropActive: false,
  };
}
