import { calculateParameterModes } from "../../../intcode/parameterModes";



test.each`
  value                              | expected
  ${1002} | ${[[0,1, 0], 2]}
  ${203} | ${[[2,0, 0], 3]}
  ${1199} | ${[[1,1, 0], 99]}
  ${parseInt("0101", 10)} | ${[[1,0, 0], 1]}
  ${parseInt("11002", 10)} | ${[[0,1,1], 2]}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected }) => {
    expect(calculateParameterModes(value)).toEqual(expected);
  }
);
