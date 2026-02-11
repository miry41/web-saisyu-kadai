import Link from "next/link";
import type { ReactNode } from "react";
import { createPiece } from "@/tetris/pieces";
import type { GameState } from "@/tetris/types";
import { MiniPiece } from "@/app/tetris/components/MiniPiece";

export function TetrisSidebar({ game, onRestart }: { game: GameState; onRestart: () => void }) {
  const stateLabel =
    game.phase === "gameover" ? "GameOver" : game.paused ? "Paused" : game.phase === "rotating" ? "Rotating" : "Playing";

  return (
    <aside className="flex flex-col justify-center gap-4 rounded-xl border-2 border-fuchsia-400/30 bg-[#0b1020]/85 p-4 shadow-[0_0_32px_rgba(168,85,247,0.22)] lg:p-5">
      <h1 className="font-mono text-3xl font-bold tracking-wide text-cyan-200 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">Tetris MVP</h1>
      <div className="space-y-2 rounded-lg border border-cyan-400/25 bg-[#0f172a]/80 p-3 font-mono text-sm">
        <Row label="STATE" value={stateLabel} />
        <Row label="SCORE" value={`${game.score}`} />
        <Row label="LINES" value={`${game.totalClearedLines}`} />
        <Row label="ROTATE IN" value={`${Math.max(0, Math.ceil((game.nextRotateAtMs - game.elapsedMs) / 1000))}s`} accent />
        {game.phase === "rotating" && game.lastRotateDir && (
          <p className="pt-1 text-xs font-semibold text-amber-300">DIR: {game.lastRotateDir === "cw" ? "RIGHT 90°" : "LEFT 90°"}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card title="NEXT"><MiniPiece piece={game.nextPiece} /></Card>
        <Card title="HOLD">
          <MiniPiece piece={game.holdPieceKind ? createPiece(game.holdPieceKind) : null} />
          <p className="text-[10px] text-zinc-500">{game.canHold ? "available" : "used this turn"}</p>
        </Card>
      </div>

      <div className="rounded-lg border border-zinc-700/70 bg-black/20 p-3 font-mono text-xs text-zinc-200">
        <p className="mb-2 text-[11px] tracking-wide text-zinc-400">CONTROLS</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          <p className="whitespace-nowrap">← / → : Move</p><p className="whitespace-nowrap">↓ : Soft Drop</p>
          <p className="whitespace-nowrap">X / Z : Rotate</p><p className="whitespace-nowrap">Space : Hard Drop</p>
          <p className="whitespace-nowrap">C : Hold</p><p className="whitespace-nowrap">Esc : Pause</p>
          <p className="col-span-2 whitespace-nowrap">R : Restart</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={onRestart} className="flex-1 border-2 border-cyan-300/80 bg-cyan-300/10 px-4 py-2 font-mono text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20">Restart</button>
        <Link href="/" className="flex-1 border-2 border-fuchsia-300/70 bg-fuchsia-300/10 px-4 py-2 text-center font-mono text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-300/20">Back</Link>
      </div>
    </aside>
  );
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-400">{label}</span>
      <span className={`font-semibold ${accent ? "text-amber-200" : "text-zinc-100"}`}>{value}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2 rounded-lg border border-indigo-400/30 bg-[#111827]/80 p-3 text-center">
      <p className="font-mono text-xs tracking-wide text-zinc-400">{title}</p>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
