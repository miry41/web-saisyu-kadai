export type TetrisAction =
  | "moveLeft"
  | "moveRight"
  | "softDropStart"
  | "softDropEnd"
  | "rotateCw"
  | "rotateCcw"
  | "hardDrop"
  | "hold"
  | "pauseToggle"
  | "restart";

export function keyToAction(event: KeyboardEvent, onKeyUp = false): TetrisAction | null {
  if (onKeyUp) {
    if (event.code === "ArrowDown") {
      return "softDropEnd";
    }
    return null;
  }

  switch (event.code) {
    case "ArrowLeft":
      return "moveLeft";
    case "ArrowRight":
      return "moveRight";
    case "ArrowDown":
      return "softDropStart";
    case "KeyX":
      return "rotateCw";
    case "KeyZ":
      return "rotateCcw";
    case "Space":
      return "hardDrop";
    case "KeyC":
      return "hold";
    case "Escape":
      return "pauseToggle";
    case "KeyR":
      return "restart";
    default:
      return null;
  }
}
