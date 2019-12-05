import * as fs from "fs";
import * as path from "path";
import { parseInput, runProgram } from "./task1";

fs.readFile(
  path.join(__dirname, "input"),
  "utf8",
  (error: Error | null, data: string) => {
    console.log(runProgram(parseInput(data), [1]));
  }
);
