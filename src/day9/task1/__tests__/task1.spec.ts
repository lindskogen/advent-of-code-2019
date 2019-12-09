import { readFileSync } from "fs";
import * as path from "path";
import { parseInput } from "../../../intcode/parse";
import { runProgramWithSyncInput } from "../../../intcode/program";

test.each`
  program                                                        | input  | expected
  ${"109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99"} | ${[]}  | ${[109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99]}
  ${"1102,34915192,34915192,7,4,7,99,0"}                         | ${[7]} | ${[1219070632396864]}
  ${"104,1125899906842624,99"}                                   | ${[7]} | ${[1125899906842624]}
  ${readFileSync(path.join(__dirname, '../input'), 'utf8')} | ${[1]} | ${[2171728567]}
`(
  "runProgram returns $expected for example input: $program",
  async ({ program, input, expected }) => {
    expect(await runProgramWithSyncInput(parseInput(program), input)).toEqual(
      expected
    );
  }
);
