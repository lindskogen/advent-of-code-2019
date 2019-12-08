import * as fs from "fs";
import * as path from "path";
import { partition } from "./task1";

fs.readFile(
  path.join(__dirname, "input"),
  "utf8",
  (error: Error | null, data: string) => {
    const width = 25;
    const height = 6;
    const layers = partition(data, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const val = layers
          .find(layer => layer[y].charAt(x) !== "2")!
          [y].charAt(x);
        process.stdout.write(val === "1" ? "▇" : " ");
      }
      process.stdout.write("\n");
    }
  }
);
