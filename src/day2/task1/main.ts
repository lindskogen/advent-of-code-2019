import * as fs from "fs";
import * as path from "path";
import { parseInput, runWithInput } from "./task1";

fs.readFile(
  path.join(__dirname, "input"),
  "utf8",
  (error: Error | null, data: string) => {
    console.log(runWithInput(parseInput(data), 12, 2));
  }
);
