import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070b18]">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(80,110,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(80,110,255,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.20),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,0.18),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.12),transparent_40%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4">
        <div className="w-full rounded-2xl border-2 border-cyan-400/30 bg-[#0b1020]/85 p-7 text-center shadow-[0_0_40px_rgba(56,189,248,0.2)] lg:p-9">
          <h1 className="font-mono text-5xl font-bold tracking-wide text-cyan-200 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">
            GRAVITY TETRIS
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-mono text-sm leading-relaxed text-zinc-300">
            回転イベントを活かしながらテンポよく連鎖。操作はシンプル、駆け引きはディープ。
          </p>

          <div className="mt-8">
            <Link
              href="/tetris"
              className="inline-block border-2 border-cyan-300/80 bg-cyan-300/10 px-10 py-4 font-mono text-xl font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
            >
              PLAY NOW
            </Link>
          </div>

          <div className="mt-7 rounded-lg border border-zinc-700/70 bg-black/25 p-4 font-mono text-xs text-zinc-200">
            <p className="mb-2 text-[11px] tracking-wide text-zinc-400">CONTROLS / 操作ガイド</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-left">
              <p className="whitespace-nowrap">← / → : Move (移動)</p>
              <p className="whitespace-nowrap">↓ : Soft Drop (落下)</p>
              <p className="whitespace-nowrap">X / Z : Rotate (回転)</p>
              <p className="whitespace-nowrap">Space : Hard Drop (一気落下)</p>
              <p className="whitespace-nowrap">C : Hold</p>
              <p className="whitespace-nowrap">Esc : Pause</p>
              <p className="whitespace-nowrap col-span-2">R : Restart</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
