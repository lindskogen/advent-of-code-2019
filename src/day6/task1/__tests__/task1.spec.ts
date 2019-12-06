import { parseInput, runProgram } from "../task1";

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
K)L`;

test("parseInput", () => {
  expect(parseInput(input)).toEqual([
    ["COM", "B"],
    ["B", "C"],
    ["C", "D"],
    ["D", "E"],
    ["E", "F"],
    ["B", "G"],
    ["G", "H"],
    ["D", "I"],
    ["E", "J"],
    ["J", "K"],
    ["K", "L"]
  ]);
});

test.each`
  value    | expected
  ${input} | ${42}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected }) => {
    expect(runProgram(parseInput(value))).toEqual(expected);
  }
);
