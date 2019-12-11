import * as fs from "fs";
import * as path from "path";
import { parseKey } from "../task1/task1";
import { runProgram } from "./task1";

fs.readFile(
  path.join(__dirname, "input"),
  "utf8",
  async (error: Error | null, data: string) => {
    const string = runProgram(data)[199];
    const [x, y] = parseKey(string);
    console.log(x * 100 + y);
  }
);
