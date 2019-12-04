import { validateNumber } from "../task1";

test.each`
  value       | expected
  ${"111111"} | ${true}
  ${"223450"} | ${false}
  ${"123789"} | ${false}
  ${"123789"} | ${false}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected }) => {
    expect(validateNumber(value)).toBe(expected);
  }
);
