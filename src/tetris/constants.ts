import type { CellValue } from "@/tetris/types";

export const BOARD_WIDTH = 16;
export const BOARD_HEIGHT = 16;
export const BLOCK_SIZE_PX = 28;

export const INITIAL_DROP_INTERVAL_MS = 1500;
export const MIN_DROP_INTERVAL_MS = 700;
export const DROP_SPEEDUP_STEP_MS = 20;
export const DROP_SPEEDUP_EVERY_MS = 20_000;
export const SOFT_DROP_INTERVAL_MS = 60;
export const INITIAL_NEXT_ROTATE_AT_MS = 30_000;
export const ROTATE_EVENT_INTERVAL_MS = 30_000;
export const ROTATE_GRAVITY_STEP_MS = 40;
export const ROTATE_ANNOUNCE_MS = 500;
export const ROTATE_ANIMATION_MS = 1_500;
export const ROTATE_LINGER_MS = 800;

export const SPAWN_X = Math.floor(BOARD_WIDTH / 2) - 2;
export const SPAWN_Y = 0;

export const SCORE_PER_LINES: Record<number, number> = {
  0: 0,
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};

export const CELL_COLORS: Record<CellValue, string> = {
  0: "#0f172a",
  1: "#22d3ee",
  2: "#facc15",
  3: "#a78bfa",
  4: "#4ade80",
  5: "#ef4444",
  6: "#3b82f6",
  7: "#f97316",
};
