import { getMaxListeners } from "cluster";
import * as fs from "fs";
import * as path from "path";
import { countOccurrencesOfChar, partition } from "./task1";

fs.readFile(
  path.join(__dirname, "input"),
  "utf8",
  (error: Error | null, data: string) => {
    const partitions = partition(data, 25, 6);

    console.log(partitions);


    const layers = partitions.map(p => p.join(''));

    const countZeros = layers.map(layer => countOccurrencesOfChar(layer, "0"));

    const leastZerosIndex = countZeros.indexOf(Math.min(...countZeros));
      console.log(countZeros, leastZerosIndex);

    const layer = layers[leastZerosIndex];

    console.log(layers.map(l => [...l].sort().join('')));

    console.log(
      countOccurrencesOfChar(layer, "1") * countOccurrencesOfChar(layer, "2")
    );
  }
);
