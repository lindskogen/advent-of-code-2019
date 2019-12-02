import * as fs from "fs";
import * as path from "path";
import { parseInput } from "../task1/task1";
import { runWithInputAndFindOutputSum } from "./task2";

fs.readFile(
  path.join(__dirname, "input"),
  "utf8",
  (error: Error | null, data: string) => {

    console.log(runWithInputAndFindOutputSum(parseInput(data), 1969_07_20));
  }
);
