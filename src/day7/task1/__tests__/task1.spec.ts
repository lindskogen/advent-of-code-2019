import { maxThrusters } from "../task1";

test.each`
  value                                               | expected
  ${"3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"} | ${43210}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected }) => {
    expect(maxThrusters(value)).toEqual(expected);
  }
);
