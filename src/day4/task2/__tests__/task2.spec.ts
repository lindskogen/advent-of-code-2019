import { validateNumber } from "../task2";

test.each`
  value       | expected
  ${"112233"} | ${true}
  ${"123444"} | ${false}
  ${"111122"} | ${true}
  ${"779999"} | ${true}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected }) => {
    expect(validateNumber(value)).toBe(expected);
  }
);
