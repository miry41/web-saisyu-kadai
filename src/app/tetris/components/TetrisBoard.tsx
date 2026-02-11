import type { RefObject } from "react";

type TetrisBoardProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
};

export function TetrisBoard({ canvasRef, width, height }: TetrisBoardProps) {
  return (
    <section className="flex w-full items-center justify-center rounded-xl border-2 border-sky-400/30 bg-[#020617]/70 shadow-[0_0_40px_rgba(56,189,248,0.16)]">
      <div className="w-full max-w-[min(100%,86vh)] rounded-lg border-2 border-indigo-300/40 bg-black/40">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block aspect-square h-auto w-full rounded-sm border-2 border-cyan-300/45"
          aria-label="Tetris board"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    </section>
  );
}
