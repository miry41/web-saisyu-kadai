import { SOFT_DROP_INTERVAL_MS } from "@/tetris/constants";
import { canPlace } from "@/tetris/logic/collide";
import type { GameState } from "@/tetris/types";
import { applySoftDropTimer, getDropIntervalMs } from "@/tetris/engine/helpers";
import { resolveLocking } from "@/tetris/engine/locking";
import { resolveRotating, startRotateEvent } from "@/tetris/engine/rotate";

export function advanceGame(prev: GameState, deltaMs: number): GameState {
  if (prev.paused || prev.phase === "gameover") {
    return prev;
  }

  let next = { ...prev, elapsedMs: prev.elapsedMs + deltaMs };
  next = applySoftDropTimer(next, deltaMs);

  if (next.phase === "locking") {
    return resolveLocking(next);
  }
  if (next.phase === "rotating") {
    return resolveRotating(next, deltaMs);
  }
  if (next.elapsedMs >= next.nextRotateAtMs) {
    return startRotateEvent(next);
  }

  const dropInterval = next.softDropActive ? SOFT_DROP_INTERVAL_MS : getDropIntervalMs(next.elapsedMs);
  let accumulator = next.dropAccumulatorMs + deltaMs;
  let currentPiece = next.currentPiece;
  let landed = false;

  while (accumulator >= dropInterval) {
    accumulator -= dropInterval;
    const moved = { ...currentPiece, y: currentPiece.y + 1 };
    if (!canPlace(next.board, moved)) {
      landed = true;
      break;
    }
    currentPiece = moved;
  }

  const movedState: GameState = {
    ...next,
    currentPiece,
    dropAccumulatorMs: landed ? 0 : accumulator,
    phase: landed ? "locking" : "playing",
  };

  return movedState.phase === "locking" ? resolveLocking(movedState) : movedState;
}
