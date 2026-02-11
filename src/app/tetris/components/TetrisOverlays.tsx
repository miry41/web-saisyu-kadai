import Link from "next/link";
import type { GameState } from "@/tetris/types";

type TetrisOverlaysProps = {
  game: GameState;
  onRestart: () => void;
};

export function TetrisOverlays({ game, onRestart }: TetrisOverlaysProps) {
  return (
    <>
      {game.paused && game.phase !== "gameover" && (
        <OverlayWithActions
          frameClass="border-cyan-300 text-cyan-100 shadow-[0_0_25px_rgba(56,189,248,0.45)]"
          onRestart={onRestart}
        >
          PAUSED
        </OverlayWithActions>
      )}
      {game.phase === "rotating" && !game.paused && (
        <Overlay frameClass="border-amber-400 text-amber-200 shadow-[0_0_25px_rgba(251,191,36,0.45)]">
          {game.rotateStage === "announce"
            ? `NEXT: ${game.lastRotateDir === "cw" ? "RIGHT 90°" : "LEFT 90°"}`
            : game.rotateStage === "animating"
              ? "WHEEEE..."
              : game.rotateStage === "linger"
                ? "..."
                : "BLOCKS FALLING"}
        </Overlay>
      )}
      {game.phase === "gameover" && (
        <OverlayWithActions
          frameClass="border-rose-400 text-rose-200 shadow-[0_0_25px_rgba(251,113,133,0.45)]"
          onRestart={onRestart}
        >
          GAME OVER
        </OverlayWithActions>
      )}
    </>
  );
}

function Overlay({ children, frameClass }: { children: string; frameClass: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
      <div className={`rounded-xl border-2 bg-[#020617]/95 px-16 py-10 font-mono text-5xl font-bold tracking-wider ${frameClass}`}>{children}</div>
    </div>
  );
}

function OverlayWithActions({
  children,
  frameClass,
  onRestart,
}: {
  children: string;
  frameClass: string;
  onRestart: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
      <div className={`rounded-xl border-2 bg-[#020617]/95 px-16 py-10 font-mono text-5xl font-bold tracking-wider ${frameClass}`}>
        <div className="text-center">{children}</div>
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={onRestart}
            className="border-2 border-cyan-300/80 bg-cyan-300/10 px-8 py-4 text-lg font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
          >
            Restart
          </button>
          <Link
            href="/"
            className="border-2 border-fuchsia-300/70 bg-fuchsia-300/10 px-8 py-4 text-lg font-semibold text-fuchsia-100 transition hover:bg-fuchsia-300/20"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
