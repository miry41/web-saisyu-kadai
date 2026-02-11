import { ROTATE_ANIMATION_MS, ROTATE_ANNOUNCE_MS, ROTATE_EVENT_INTERVAL_MS, ROTATE_GRAVITY_STEP_MS, ROTATE_LINGER_MS } from "@/tetris/constants";
import { applyGravityDown } from "@/tetris/logic/applyGravityDown";
import { clearLinesWithGroups } from "@/tetris/logic/clearLines";
import { mergePieceWithGroup } from "@/tetris/logic/merge";
import { rotateBoard90, rotateGroupBoard90 } from "@/tetris/logic/rotateBoard";
import { nextRngInt } from "@/tetris/rng";
import type { GameState } from "@/tetris/types";
import { clearSoftDropState, spawnAfterBoardUpdate } from "@/tetris/engine/helpers";

export function startRotateEvent(state: GameState): GameState {
  const merged = mergePieceWithGroup(state.board, state.currentPiece, state.boardGroups, state.nextGroupId);
  const rngPick = nextRngInt(state.rng, 2);
  const rotateDir = rngPick.value === 0 ? "cw" : "ccw";

  return {
    ...state,
    board: merged.board,
    boardGroups: merged.groupBoard,
    nextGroupId: state.nextGroupId + 1,
    phase: "rotating",
    canHold: true,
    dropAccumulatorMs: 0,
    rotateAccumulatorMs: 0,
    lastRotateDir: rotateDir,
    rotateStage: "announce",
    rotateStageRemainingMs: ROTATE_ANNOUNCE_MS,
    pendingRotatedBoard: rotateBoard90(merged.board, rotateDir),
    pendingRotatedGroups: rotateGroupBoard90(merged.groupBoard, rotateDir),
    rng: rngPick.rng,
    nextRotateAtMs: getNextRotateAtMs(state.nextRotateAtMs, state.elapsedMs),
    ...clearSoftDropState(),
  };
}

export function resolveRotating(state: GameState, deltaMs: number): GameState {
  switch (state.rotateStage) {
    case "announce":
      return advanceRotateStageTimer(state, deltaMs, ROTATE_ANIMATION_MS, "animating").nextState;
    case "animating":
      return resolveAnimatingStage(state, deltaMs);
    case "linger":
      return advanceRotateStageTimer(state, deltaMs, 0, "falling").nextState;
    case "falling":
      return resolveRotateFalling(state, deltaMs);
    case "none":
      return resolveRotateFalling(state, deltaMs);
  }
}

function resolveAnimatingStage(state: GameState, deltaMs: number): GameState {
  const { nextState, advanced } = advanceRotateStageTimer(state, deltaMs, ROTATE_LINGER_MS, "linger");
  if (!advanced) {
    return nextState;
  }

  return applyPendingRotation(nextState, state);
}

function applyPendingRotation(nextState: GameState, sourceState: GameState): GameState {
  return {
    ...nextState,
    board: sourceState.pendingRotatedBoard ?? sourceState.board,
    boardGroups: sourceState.pendingRotatedGroups ?? sourceState.boardGroups,
    pendingRotatedBoard: null,
    pendingRotatedGroups: null,
    rotateAccumulatorMs: 0,
  };
}

function resolveRotateFalling(state: GameState, deltaMs: number): GameState {
  let board = state.board;
  let groupBoard = state.boardGroups;
  let accumulator = state.rotateAccumulatorMs + deltaMs;
  let stable = false;

  while (accumulator >= ROTATE_GRAVITY_STEP_MS) {
    accumulator -= ROTATE_GRAVITY_STEP_MS;
    const dropped = applyGravityDown(board, groupBoard);
    board = dropped.board;
    groupBoard = dropped.groupBoard;
    if (!dropped.moved) {
      stable = true;
      break;
    }
  }

  if (!stable) {
    return { ...state, board, boardGroups: groupBoard, rotateAccumulatorMs: accumulator };
  }

  const { board: clearedBoard, groupBoard: clearedGroups, clearedLines } = clearLinesWithGroups(board, groupBoard);
  return spawnAfterBoardUpdate(state, {
    board: clearedBoard,
    groupBoard: clearedGroups,
    clearedLines,
    nextGroupId: state.nextGroupId,
  });
}

function advanceRotateStageTimer(
  state: GameState,
  deltaMs: number,
  nextMs: number,
  nextStage: GameState["rotateStage"],
): { nextState: GameState; advanced: boolean } {
  const remaining = state.rotateStageRemainingMs - deltaMs;
  if (remaining > 0) {
    return { nextState: { ...state, rotateStageRemainingMs: remaining }, advanced: false };
  }
  return { nextState: { ...state, rotateStage: nextStage, rotateStageRemainingMs: nextMs }, advanced: true };
}

function getNextRotateAtMs(currentRotateAtMs: number, elapsedMs: number): number {
  let nextRotateAtMs = currentRotateAtMs + ROTATE_EVENT_INTERVAL_MS;
  while (nextRotateAtMs <= elapsedMs) {
    nextRotateAtMs += ROTATE_EVENT_INTERVAL_MS;
  }
  return nextRotateAtMs;
}
