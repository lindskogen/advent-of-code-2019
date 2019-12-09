import { Channel } from "@jfet97/csp";
import "@jfet97/csp/dist/operators/fromIterable";
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
    const [[pmode1, pmode2, pmode3], instruction] = calculateParameterModes(
      getParam(0)
    );

    switch (instruction) {
      case 99:
        break wh;
      case 1: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        let p3 = getParam(3);
        let v1 = getValueWithParameterMode(opCodes, relativeBase, p1, pmode1);
        let v2 = getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        let d = getAddressWithParameterMode(relativeBase, p3, pmode3);

        opCodes[d] = v1 + v2;
        index += 4;
        break;
      }
      case 2: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        let p3 = getParam(3);
        let v1 = getValueWithParameterMode(opCodes, relativeBase, p1, pmode1);
        let v2 = getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        let d = getAddressWithParameterMode(relativeBase, p3, pmode3);

        opCodes[d] = v1 * v2;
        index += 4;
        break;
      }
      case 3: {
        let p1 = getParam(1);
        let d = getAddressWithParameterMode(relativeBase, p1, pmode1);
        opCodes[d] = await input.take();
        index += 2;
        break;
      }
      case 4: {
        let p1 = getParam(1);
        const param = getValueWithParameterMode(
          opCodes,
          relativeBase,
          p1,
          pmode1
        );
        outputs.push(param);
        output.put(param);
        index += 2;
        break;
      }
      case 5: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        if (getValueWithParameterMode(opCodes, relativeBase, p1, pmode1)) {
          index = getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        } else {
          index += 3;
        }
        break;
      }
      case 6: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        if (!getValueWithParameterMode(opCodes, relativeBase, p1, pmode1)) {
          index = getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        } else {
          index += 3;
        }
        break;
      }
      case 7: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        let p3 = getParam(3);
        const res =
          getValueWithParameterMode(opCodes, relativeBase, p1, pmode1) <
          getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        let d = getAddressWithParameterMode(relativeBase, p3, pmode3);
        opCodes[d] = res ? 1 : 0;
        index += 4;
        break;
      }
      case 8: {
        let p1 = getParam(1);
        let p2 = getParam(2);
        let p3 = getParam(3);
        const res =
          getValueWithParameterMode(opCodes, relativeBase, p1, pmode1) ===
          getValueWithParameterMode(opCodes, relativeBase, p2, pmode2);
        let d = getAddressWithParameterMode(relativeBase, p3, pmode3);
        opCodes[d] = res ? 1 : 0;
        index += 4;
        break;
      }
      case 9: {
        let p1 = getParam(1);
        relativeBase += getValueWithParameterMode(opCodes, relativeBase, p1, pmode1);

        index += 2;
        break;
      }
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
