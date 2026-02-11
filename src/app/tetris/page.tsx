import type { Metadata } from "next";
import { TetrisClient } from "@/app/tetris/TetrisClient";

export const metadata: Metadata = {
  title: "Tetris MVP",
  description: "16x16 Tetris MVP",
};

export default function TetrisPage() {
  return <TetrisClient />;
}
