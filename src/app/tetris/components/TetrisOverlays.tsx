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
          showShareToX
          score={game.score}
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
  showShareToX = false,
  score = 0,
}: {
  children: string;
  frameClass: string;
  onRestart: () => void;
  showShareToX?: boolean;
  score?: number;
}) {
  const getScoreComment = (value: number) => {
    if (value >= 15000) return "神プレイ出た！";
    if (value >= 10000) return "かなり仕上がってきた！";
    if (value >= 6000) return "いい感じに積めた！";
    if (value >= 3000) return "まだまだ伸ばせる！";
    if (value >= 1000) return "もっと頑張りたい...";
    if (value >= 0) return "全然だめだ...";
    return "次はもっと高得点を狙う！";
  };

  const handleShareToX = () => {
    const topUrl = `${window.location.origin}/`;
    const text = `スコアは ${score} 点！\n${getScoreComment(score)}\n#Tetris #GRAVITY_TETRIS\n`;
    const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(topUrl)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
      <div className={`rounded-xl border-2 bg-[#020617]/95 px-16 py-10 font-mono text-5xl font-bold tracking-wider ${frameClass}`}>
        <div className="text-center">{children}</div>
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={onRestart}
            className="rounded-md border-2 border-cyan-300/80 bg-cyan-300/15 px-8 py-4 text-lg font-semibold text-cyan-100 transition hover:bg-cyan-300/30"
          >
            Restart
          </button>
          <Link
            href="/"
            className="rounded-md border-2 border-fuchsia-300/70 bg-fuchsia-300/15 px-8 py-4 text-lg font-semibold text-fuchsia-100 transition hover:bg-fuchsia-300/30"
          >
            Back
          </Link>
        </div>
        {showShareToX && (
          <div className="mt-7 border-t border-slate-500/40 pt-5 text-center">
            <p className="mb-3 text-base font-semibold tracking-normal text-slate-200/90">スコアをシェア</p>
            <button
              type="button"
              onClick={handleShareToX}
              className="rounded-md border-2 border-sky-300/80 bg-sky-300/15 px-8 py-4 text-lg font-semibold tracking-normal text-sky-100 transition hover:bg-sky-300/30"
            >
              Share on X
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
