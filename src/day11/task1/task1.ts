import { readFileSync } from "fs";
import * as path from "path";
import { parseInput } from "../../intcode/parse";

enum Direction {
  Up,
  Right,
  Down,
  Left
}

const program = parseInput(
  readFileSync(path.join(__dirname, "../input"), "utf8")
);

const runPaintingProgram = () => {
  let direction = Direction.Up;
};
