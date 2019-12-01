import * as fs from "fs";
import * as path from "path";
import { getFuelForMass } from "./task2";

fs.readFile(path.join(__dirname, "input"), "utf8", (error: Error | null, data: string) => {
  const sum = data
    .split("\n")
    .map(line => parseInt(line, 10))
    .map(getFuelForMass)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(sum);
});
