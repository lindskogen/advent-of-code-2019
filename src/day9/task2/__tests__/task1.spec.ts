import { readFileSync } from "fs";
import * as path from "path";
import { parseInput } from "../../../intcode/parse";
import { runProgramWithSyncInput } from "../../../intcode/program";

test.each`
  program                                                   | input  | expected
  ${readFileSync(path.join(__dirname, "../input"), "utf8")} | ${[2]} | ${[49815]}
`(
  "runProgram returns $expected for example input: $program",
  async ({ program, input, expected }) => {
    expect(await runProgramWithSyncInput(parseInput(program), input)).toEqual(
      expected
    );
  }
);
