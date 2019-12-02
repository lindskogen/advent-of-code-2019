import { runWithInput } from "../task1/task1";

function* tupleRange(
  inclusiveStart: number,
  exclusiveEnd: number
): Generator<[number, number]> {
  for (let i = inclusiveStart; i < exclusiveEnd; i++) {
    for (let j = inclusiveStart; j < exclusiveEnd; j++) {
      yield [i, j];
    }
  }
}

export const runWithInputAndFindOutputSum = (
  program: number[],
  outputToFind: number
): number => {
  for (const [i, j] of tupleRange(0, 100)) {
    if (runWithInput(program, i, j) === outputToFind) {
      return 100 * i + j;
    }
  }
  throw new Error("Value not found");
};
