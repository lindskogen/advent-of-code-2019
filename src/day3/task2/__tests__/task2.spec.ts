import { runProgram } from "../task2";

const input1 = `R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83`;

const input2 = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;

test.each`
  value     | expected
  ${input1} | ${610}
  ${input2} | ${410}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected }) => {
    expect(runProgram(value)).toBe(expected);
  }
);
