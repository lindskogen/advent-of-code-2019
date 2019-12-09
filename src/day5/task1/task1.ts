import { calculateParameterModes, ParameterMode } from "../../intcode/parameterModes";

export const parseInput = (input: string): number[] =>
  input.split(",").map(str => parseInt(str, 10));

const getValueWithParameterMode = (
  opCodes: number[],
  param: number,
  paramMode: ParameterMode
): number => {
  switch (paramMode) {
    case ParameterMode.Position:
      return opCodes[param];
    case ParameterMode.Immediate:
      return param;
    default:
      throw new Error("Unknown parameter mode " + paramMode);
  }
};

export const runProgram = (opCodes: number[], inputs: number[]): number[] => {
  let outputs = [];
  let inputIndex = 0;
  const getInput = () => {
    let number = inputs[inputIndex];
    if (number === undefined) {
      throw new Error("Cannot read input at index " + inputIndex);
    }
    inputIndex++;
    return number;
  };

  let index = 0;
  wh: while (true) {
    const [[pmode1, pmode2], instruction] = calculateParameterModes(
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
        opCodes[p1] = getInput();
        index += 2;
        break;
      }
      case 4: {
        let p1 = opCodes[index + 1];
        outputs.push(getValueWithParameterMode(opCodes, p1, pmode1));
        index += 2;
        break;
      }
    }
  }
  return outputs;
};
