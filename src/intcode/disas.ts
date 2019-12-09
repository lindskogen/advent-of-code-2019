import { instructionLength, IntCodeOp } from "./asm";
import {
  calculateParameterModes,
  ParameterMode,
  parameterModeChar
} from "./parameterModes";

const range = (x: number) => [...Array(x).keys()];

export type Listing = [number, string][];

export const prettyPrintDisas = (lst: Listing): string =>
  lst.map(([index, op]) => `${index}: ${op}`).join("\n");

export const disas = (opcodes: number[]): Listing => {


  const formatParameters = (
    lenParams: number,
    modes: ParameterMode[],
    index: number
  ) => {
    if (lenParams === 0) {
      return "";
    }

    return (
      " " +
      range(lenParams)
        .map<string>(i => parameterModeChar[modes[i]] + opcodes[index + i + 1])
        .join(" ")
    );
  };

  const list: Listing = [];
  const length = opcodes.length;

  for (let index = 0; index < length; ) {
    const [modes, op] = calculateParameterModes(opcodes[index]);

    if (IntCodeOp[op]) {
      const lenParams = instructionLength[op];

      list.push([
        index,
        `${IntCodeOp[op]}${formatParameters(lenParams, modes, index)}`
      ]);

      index += lenParams + 1;
    } else {
      list.push([
        index,
        parameterModeChar[ParameterMode.Immediate] + op.toString(10)
      ]);
      index += 1;
    }
  }
  return list;
};
