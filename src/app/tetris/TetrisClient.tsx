"use client";

import { createInitialGameState } from "@/tetris/engine";
import { TetrisBoard } from "@/app/tetris/components/TetrisBoard";
import { TetrisOverlays } from "@/app/tetris/components/TetrisOverlays";
import { TetrisSidebar } from "@/app/tetris/components/TetrisSidebar";
import { useTetrisGame } from "@/app/tetris/hooks/useTetrisGame";

export function TetrisClient() {
  const { game, setGame, canvasRef, canvasSize } = useTetrisGame();
  const handleRestart = () => setGame(createInitialGameState(Date.now() >>> 0));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070b18]">
      <RetroBackground />
      <div className="relative mx-auto grid min-h-screen w-full max-w-[1450px] grid-cols-1 gap-3 px-2 py-3 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-3 lg:px-3 lg:py-4 xl:grid-cols-[minmax(0,1fr)_390px]">
        <TetrisBoard canvasRef={canvasRef} width={canvasSize.width} height={canvasSize.height} />
        <TetrisSidebar game={game} onRestart={handleRestart} />
      </div>
      <TetrisOverlays game={game} onRestart={handleRestart} />
    </main>
  );
}

function RetroBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(80,110,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(80,110,255,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.20),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,0.18),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.12),transparent_40%)]" />
    </>
  );
}
