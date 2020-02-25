import { Channel } from "@jfet97/csp";
import { readFileSync } from "fs";
import * as path from "path";
import { parseInput } from "../../../intcode/parse";
import { runProgram } from "../../../intcode/program";

test("it works for input3", () => {
  const inputChannel = new Channel<number>();
  const outputChannel = new Channel<number>();
  runProgram(program, )
});
