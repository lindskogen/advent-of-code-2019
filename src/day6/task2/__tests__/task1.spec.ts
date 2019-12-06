import { parseInput } from "../../task1/task1";
import { runProgram } from "../task2";

const input = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;

test.each`
  value    | expected
  ${input} | ${4}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected }) => {
    expect(runProgram(parseInput(value))).toBe(expected);
  }
);
