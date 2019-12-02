export const parseInput = (input: string): number[] =>
  input.split(",").map(str => parseInt(str, 10));

export const runProgram = (opCodes: number[]): number => {
  let index = 0;
  wh: while (true) {
    switch (opCodes[index]) {
      case 99:
        break wh;
      case 1: {
        let p1 = opCodes[index + 1];
        let p2 = opCodes[index + 2];
        let p3 = opCodes[index + 3];
        let v1 = opCodes[p1];
        let v2 = opCodes[p2];

        opCodes[p3] = v1 + v2;
        index += 4;
        break;
      }
      case 2: {
        let p1 = opCodes[index + 1];
        let p2 = opCodes[index + 2];
        let p3 = opCodes[index + 3];
        let v1 = opCodes[p1];
        let v2 = opCodes[p2];

        opCodes[p3] = v1 * v2;
        index += 4;
        break;
      }
    }
  }
  return opCodes[0];
};

export const runWithInput = (
  program: number[],
  arg1: number,
  arg2: number
): number => {
  const opCodes = program.slice();
  opCodes[1] = arg1;
  opCodes[2] = arg2;

  return runProgram(opCodes);
};
