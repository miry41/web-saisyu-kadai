import { useEffect, useMemo, useRef, useState } from "react";
import { ROTATE_ANIMATION_MS } from "@/tetris/constants";
import { advanceGame, applyGameAction, createInitialGameState } from "@/tetris/engine";
import { keyToAction } from "@/tetris/input/keyboard";
import { drawGame, getCanvasSize } from "@/tetris/render/draw";
import type { GameState } from "@/tetris/types";

const TICK_MS = 16;

export function useTetrisGame() {
  const [game, setGame] = useState<GameState>(() => createInitialGameState());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasSize = useMemo(() => getCanvasSize(), []);

  useEffect(() => {
    const timer = window.setInterval(() => setGame((prev) => advanceGame(prev, TICK_MS)), TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawParams = { ctx, board: game.board, currentPiece: game.phase === "playing" ? game.currentPiece : null };
    if (game.phase === "rotating" && game.rotateStage === "animating" && game.lastRotateDir) {
      const progress = 1 - game.rotateStageRemainingMs / ROTATE_ANIMATION_MS;
      const angle = (game.lastRotateDir === "cw" ? 1 : -1) * progress * (Math.PI / 2);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      drawGame(drawParams);
      ctx.restore();
      return;
    }
    drawGame(drawParams);
  }, [game]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const action = keyToAction(event, false);
      if (!action) return;
      if (action !== "restart") event.preventDefault();
      setGame((prev) => applyGameAction(prev, action));
    }

    function onKeyUp(event: KeyboardEvent) {
      const action = keyToAction(event, true);
      if (!action) return;
      setGame((prev) => applyGameAction(prev, action));
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return { game, setGame, canvasRef, canvasSize };
}
