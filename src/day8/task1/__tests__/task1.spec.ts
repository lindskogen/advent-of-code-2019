import { partition } from "../task1";

const input = `123456789012`;

test.each`
  value | width | height | expected
  ${input} | ${3} | ${2} | ${[
  ["123", "456"],
  ["789", "012"]
]}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected, width, height }) => {
    expect(partition(value, width, height)).toEqual(expected);
  }
);
