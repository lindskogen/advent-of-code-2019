import * as fs from "fs";
import * as path from "path";
import { parseInput } from "../../intcode/parse";
import { runProgramWithSyncInput } from "../../intcode/program";

fs.readFile(
  path.join(__dirname, "input"),
  "utf8",
  async (error: Error | null, data: string) => {
    const program = await runProgramWithSyncInput(parseInput(data), [1]);
    console.log(program);
  }
);
