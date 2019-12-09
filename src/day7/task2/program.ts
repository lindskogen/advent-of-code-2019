import { Channel } from "@jfet97/csp";

export const parseInput = (input: string): number[] =>
  input.split(",").map(str => parseInt(str, 10));

enum ParameterMode {
  Position = 0,
  Immeditate = 1
}

export const calculateParameterModes = (
  input: number
): [[ParameterMode, ParameterMode, ParameterMode], number] => {
  let parameterMode: [ParameterMode, ParameterMode, ParameterMode] = [0, 0, 0];
  let instruction = input;
  if (instruction > 99) {
    let x = Math.floor(instruction / 100);

    parameterMode = [
      x % 10,
      Math.floor((x / 10) % 10),
      Math.floor((x / 100) % 10)
    ];
    instruction = Math.floor(instruction % 100);
  }

  return [parameterMode, instruction];
};

const getValueWithParameterMode = (
  opCodes: number[],
  param: number,
  paramMode: ParameterMode
): number => {
  switch (paramMode) {
    case ParameterMode.Position:
      return opCodes[param];
    case ParameterMode.Immeditate:
      return param;
    default:
      throw new Error("Unknown parameter mode " + paramMode);
  }
};

export const runProgram = async (
  logIndex: number,
  opCodes: number[],
  input: Channel<number>,
  output: Channel<number>
): Promise<number[]> => {
  let outputs = [];
  let index = 0;
  wh: while (true) {
    const [[pmode1, pmode2, pmode3], instruction] = calculateParameterModes(
      opCodes[index]
    );

    switch (instruction) {
      case 99:
        break wh;
      case 1: {
        let p1 = opCodes[index + 1];
        let p2 = opCodes[index + 2];
        let p3 = opCodes[index + 3];
        let v1 = getValueWithParameterMode(opCodes, p1, pmode1);
        let v2 = getValueWithParameterMode(opCodes, p2, pmode2);

        opCodes[p3] = v1 + v2;
        index += 4;
        break;
      }
      case 2: {
        let p1 = opCodes[index + 1];
        let p2 = opCodes[index + 2];
        let p3 = opCodes[index + 3];
        let v1 = getValueWithParameterMode(opCodes, p1, pmode1);
        let v2 = getValueWithParameterMode(opCodes, p2, pmode2);

        opCodes[p3] = v1 * v2;
        index += 4;
        break;
      }
      case 3: {
        let p1 = opCodes[index + 1];
        opCodes[p1] = await input.take();
        index += 2;
        break;
      }
      case 4: {
        let p1 = opCodes[index + 1];
        const param = getValueWithParameterMode(opCodes, p1, pmode1);
        outputs.push(param);
        await output.put(param);
        index += 2;
        break;
      }
      case 5: {
        let p1 = opCodes[index + 1];
        let p2 = opCodes[index + 2];
        if (getValueWithParameterMode(opCodes, p1, pmode1)) {
          index = getValueWithParameterMode(opCodes, p2, pmode2);
        } else {
          index += 3;
        }
        break;
      }
      case 6: {
        let p1 = opCodes[index + 1];
        let p2 = opCodes[index + 2];
        if (!getValueWithParameterMode(opCodes, p1, pmode1)) {
          index = getValueWithParameterMode(opCodes, p2, pmode2);
        } else {
          index += 3;
        }
        break;
      }
      case 7: {
        let p1 = opCodes[index + 1];
        let p2 = opCodes[index + 2];
        let p3 = opCodes[index + 3];
        const res =
          getValueWithParameterMode(opCodes, p1, pmode1) <
          getValueWithParameterMode(opCodes, p2, pmode2);
        opCodes[p3] = res ? 1 : 0;
        index += 4;
        break;
      }
      case 8: {
        let p1 = opCodes[index + 1];
        let p2 = opCodes[index + 2];
        let p3 = opCodes[index + 3];
        const res =
          getValueWithParameterMode(opCodes, p1, pmode1) ===
          getValueWithParameterMode(opCodes, p2, pmode2);
        opCodes[p3] = res ? 1 : 0;
        index += 4;
        break;
      }
    }
  }
  return outputs;
};
