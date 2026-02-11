import type { TetrisAction } from "@/tetris/input/keyboard";
import { canPlace } from "@/tetris/logic/collide";
import { hardDropPiece, movePiece, rotatePieceOnBoard } from "@/tetris/logic/move";
import { createPiece } from "@/tetris/pieces";
import type { GameState } from "@/tetris/types";
import { clearSoftDropState } from "@/tetris/engine/helpers";
import { resolveLocking } from "@/tetris/engine/locking";
import { createInitialGameState } from "@/tetris/engine/state";
import { spawnNext } from "@/tetris/logic/spawn";

export function applyGameAction(prev: GameState, action: TetrisAction): GameState {
  if (action === "restart") {
    return createInitialGameState(getRuntimeSeed());
  }
  if (action === "pauseToggle") {
    return { ...prev, paused: !prev.paused, ...clearSoftDropState() };
  }
  if (isActionBlocked(prev)) {
    return prev;
  }

  switch (action) {
    case "moveLeft":
      return { ...prev, currentPiece: movePiece(prev.board, prev.currentPiece, -1, 0) };
    case "moveRight":
      return { ...prev, currentPiece: movePiece(prev.board, prev.currentPiece, 1, 0) };
    case "softDropStart":
      return { ...prev, softDropRequested: true };
    case "softDropEnd":
      return { ...prev, ...clearSoftDropState() };
    case "rotateCw":
      return { ...prev, currentPiece: rotatePieceOnBoard(prev.board, prev.currentPiece, "cw") };
    case "rotateCcw":
      return { ...prev, currentPiece: rotatePieceOnBoard(prev.board, prev.currentPiece, "ccw") };
    case "hardDrop":
      return resolveHardDrop(prev);
    case "hold":
      return holdCurrentPiece(prev);
  }
}

function isActionBlocked(state: GameState): boolean {
  return state.paused || state.phase === "gameover" || state.phase === "rotating";
}

function getRuntimeSeed(): number {
  return Date.now() >>> 0;
}

function resolveHardDrop(prev: GameState): GameState {
  const dropped = hardDropPiece(prev.board, prev.currentPiece);
  return resolveLocking({ ...prev, currentPiece: dropped, phase: "locking", dropAccumulatorMs: 0 });
}

function holdCurrentPiece(prev: GameState): GameState {
  if (!prev.canHold) {
    return prev;
  }

  const currentKind = prev.currentPiece.kind;
  if (prev.holdPieceKind === null) {
    const incoming = prev.nextPiece;
    const nextSpawn = spawnNext(prev.rng);
    const canSpawn = canPlace(prev.board, incoming);
    return {
      ...prev,
      currentPiece: incoming,
      nextPiece: nextSpawn.piece,
      holdPieceKind: currentKind,
      canHold: false,
      rng: nextSpawn.rng,
      phase: canSpawn ? "playing" : "gameover",
      dropAccumulatorMs: 0,
      ...clearSoftDropState(),
    };
  }

  const swapped = createPiece(prev.holdPieceKind);
  const canSpawn = canPlace(prev.board, swapped);
  return {
    ...prev,
    currentPiece: swapped,
    holdPieceKind: currentKind,
    canHold: false,
    phase: canSpawn ? "playing" : "gameover",
    dropAccumulatorMs: 0,
    ...clearSoftDropState(),
  };
}
