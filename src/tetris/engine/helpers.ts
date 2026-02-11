import { DROP_SPEEDUP_EVERY_MS, DROP_SPEEDUP_STEP_MS, INITIAL_DROP_INTERVAL_MS, MIN_DROP_INTERVAL_MS, SCORE_PER_LINES } from "@/tetris/constants";
import { canPlace } from "@/tetris/logic/collide";
import { spawnNext } from "@/tetris/logic/spawn";
import type { GameState } from "@/tetris/types";

export const SOFT_DROP_HOLD_THRESHOLD_MS = 120;

export function clearSoftDropState(): Pick<GameState, "softDropRequested" | "softDropHoldMs" | "softDropActive"> {
  return { softDropRequested: false, softDropHoldMs: 0, softDropActive: false };
}

export function clearRotateTransientState(): Pick<
  GameState,
  "rotateAccumulatorMs" | "rotateStage" | "rotateStageRemainingMs" | "pendingRotatedBoard" | "pendingRotatedGroups"
> {
  return {
    rotateAccumulatorMs: 0,
    rotateStage: "none",
    rotateStageRemainingMs: 0,
    pendingRotatedBoard: null,
    pendingRotatedGroups: null,
  };
}

export function applySoftDropTimer(state: GameState, deltaMs: number): GameState {
  const holdMs = state.softDropRequested ? state.softDropHoldMs + deltaMs : 0;
  return { ...state, softDropHoldMs: holdMs, softDropActive: state.softDropRequested && holdMs >= SOFT_DROP_HOLD_THRESHOLD_MS };
}

export function getDropIntervalMs(elapsedMs: number): number {
  const speedupSteps = Math.floor(elapsedMs / DROP_SPEEDUP_EVERY_MS);
  const reduced = INITIAL_DROP_INTERVAL_MS - speedupSteps * DROP_SPEEDUP_STEP_MS;
  return Math.max(MIN_DROP_INTERVAL_MS, reduced);
}

export function spawnAfterBoardUpdate(
  state: GameState,
  input: { board: GameState["board"]; groupBoard: GameState["boardGroups"]; clearedLines: number; nextGroupId: number },
): GameState {
  const currentPiece = state.nextPiece;
  const nextSpawn = spawnNext(state.rng);
  const canSpawn = canPlace(input.board, currentPiece);

  return {
    ...state,
    board: input.board,
    boardGroups: input.groupBoard,
    nextGroupId: input.nextGroupId,
    currentPiece,
    nextPiece: nextSpawn.piece,
    canHold: true,
    phase: canSpawn ? "playing" : "gameover",
    score: state.score + (SCORE_PER_LINES[input.clearedLines] ?? 0),
    totalClearedLines: state.totalClearedLines + input.clearedLines,
    rng: nextSpawn.rng,
    dropAccumulatorMs: 0,
    ...clearRotateTransientState(),
    ...clearSoftDropState(),
  };
}
