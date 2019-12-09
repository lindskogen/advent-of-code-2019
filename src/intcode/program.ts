import { Channel } from "@jfet97/csp";
import "@jfet97/csp/dist/operators/fromIterable";
import { instructionLength, IntCodeOp } from "./asm";
import {
  getAddressWithParameterMode,
  getValueWithParameterMode
} from "./memory";
import { calculateParameterModes } from "./parameterModes";

export const runProgram = async (
  opCodes: number[],
  input: Channel<number>,
  output: Channel<number>
): Promise<number[]> => {
  let outputs = [];
  let index = 0;
  let relativeBase = 0;

  const getParam = (pos: number) => opCodes[index + pos] ?? 0;

  wh: while (true) {
    let didJump = false;
    const [[pmode1, pmode2, pmode3], instruction] = calculateParameterModes(
      getParam(0)
    );

    switch (instruction) {
      case IntCodeOp.Halt:
        break wh;
      case IntCodeOp.Add: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        let p3 = getParam(3);
        let v1 = getValueWithParameterMode(opCodes, relativeBase, p1, pmode1);
        let v2 = getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        let d = getAddressWithParameterMode(relativeBase, p3, pmode3);

        opCodes[d] = v1 + v2;
        break;
      }
      case IntCodeOp.Mul: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        let p3 = getParam(3);
        let v1 = getValueWithParameterMode(opCodes, relativeBase, p1, pmode1);
        let v2 = getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        let d = getAddressWithParameterMode(relativeBase, p3, pmode3);

        opCodes[d] = v1 * v2;
        break;
      }
      case IntCodeOp.In: {
        let p1 = getParam(1);
        let d = getAddressWithParameterMode(relativeBase, p1, pmode1);
        opCodes[d] = await input.take();
        break;
      }
      case IntCodeOp.Out: {
        let p1 = getParam(1);
        const param = getValueWithParameterMode(
          opCodes,
          relativeBase,
          p1,
          pmode1
        );
        outputs.push(param);
        output.put(param);
        break;
      }
      case IntCodeOp.JmpTrue: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        if (getValueWithParameterMode(opCodes, relativeBase, p1, pmode1)) {
          didJump = true;
          index = getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        }
        break;
      }
      case IntCodeOp.JmpFalse: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        if (!getValueWithParameterMode(opCodes, relativeBase, p1, pmode1)) {
          didJump = true;
          index = getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        }
        break;
      }
      case IntCodeOp.LessThan: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        let p3 = getParam(3);
        const res =
          getValueWithParameterMode(opCodes, relativeBase, p1, pmode1) <
          getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        let d = getAddressWithParameterMode(relativeBase, p3, pmode3);
        opCodes[d] = res ? 1 : 0;
        break;
      }
      case IntCodeOp.Equals: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        let p3 = getParam(3);
        const res =
          getValueWithParameterMode(opCodes, relativeBase, p1, pmode1) ===
          getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        let d = getAddressWithParameterMode(relativeBase, p3, pmode3);
        opCodes[d] = res ? 1 : 0;
        break;
      }
      case IntCodeOp.SetRel: {
        let p1 = getParam(1);
        relativeBase += getValueWithParameterMode(
          opCodes,
          relativeBase,
          p1,
          pmode1
        );

        break;
      }
    }
    if (!didJump) {
      index += instructionLength[instruction] + 1;
    }
  }
  return outputs;
};

export const runProgramWithSyncInput = async (
  opCodes: number[],
  input: number[]
): Promise<number[]> => {
  const inputChannel = new Channel<number>();
  const outputChannel = new Channel<number>();
  const program = runProgram(opCodes, inputChannel, outputChannel);

  inputChannel.fromIterable(input);

  return program;
};
