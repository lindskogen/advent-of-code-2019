import { parseInput } from "../../../intcode/parse";
import { runProgramWithSyncInput } from "../../../intcode/program";

const program = `3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`;
test.each`
  program                       | input  | expected
  ${"3,9,8,9,10,9,4,9,99,-1,8"} | ${[8]} | ${[1]}
  ${"3,9,8,9,10,9,4,9,99,-1,8"} | ${[7]} | ${[0]}
  ${"3,9,7,9,10,9,4,9,99,-1,8"} | ${[7]} | ${[1]}
  ${"3,9,7,9,10,9,4,9,99,-1,8"} | ${[8]} | ${[0]}
  ${"3,9,7,9,10,9,4,9,99,-1,8"} | ${[9]} | ${[0]}
  ${"3,3,1108,-1,8,3,4,3,99"}   | ${[8]} | ${[1]}
  ${"3,3,1108,-1,8,3,4,3,99"}   | ${[7]} | ${[0]}
  ${program}                    | ${[7]} | ${[999]}
  ${program}                    | ${[8]} | ${[1000]}
  ${program}                    | ${[9]} | ${[1001]}
`(
  "runProgram returns $expected for example input: $program",
  async ({ program, input, expected }) => {
    expect(await runProgramWithSyncInput(parseInput(program), input)).toEqual(expected);
  }
);
