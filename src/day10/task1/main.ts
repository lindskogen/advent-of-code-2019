import * as fs from "fs";
import * as path from "path";
import { countAstroids, findMostConnectedAstroid, parseInput } from "./task1";

fs.readFile(
  path.join(__dirname, "input"),
  "utf8",
  async (error: Error | null, data: string) => {
    const astroidCountMap = countAstroids(parseInput(data));
    console.log(findMostConnectedAstroid(astroidCountMap));
  }
);
