import { clearLinesWithGroups } from "@/tetris/logic/clearLines";
import { mergePieceWithGroup } from "@/tetris/logic/merge";
import type { GameState } from "@/tetris/types";
import { spawnAfterBoardUpdate } from "@/tetris/engine/helpers";

export function resolveLocking(state: GameState): GameState {
  const merged = mergePieceWithGroup(state.board, state.currentPiece, state.boardGroups, state.nextGroupId);
  const { board: clearedBoard, groupBoard: clearedGroups, clearedLines } = clearLinesWithGroups(
    merged.board,
    merged.groupBoard,
  );

  return spawnAfterBoardUpdate(state, {
    board: clearedBoard,
    groupBoard: clearedGroups,
    clearedLines,
    nextGroupId: state.nextGroupId + 1,
  });
}
