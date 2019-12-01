import * as fs from "fs";
import * as path from "path";
import { getFuel } from "./task1";

fs.readFile(path.join(__dirname, "input"), "utf8", (error: Error | null, data: string) => {
  const sum = data
    .split("\n")
    .map(line => parseInt(line, 10))
    .map(getFuel)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(sum);
});
