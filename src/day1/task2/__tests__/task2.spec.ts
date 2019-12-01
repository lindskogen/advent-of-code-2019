import { getFuelForMass } from "../task2";

test.each`
  value     | expected
  ${14}     | ${2}
  ${1969}   | ${966}
  ${100756} | ${50346}
`("returns $expected for example input: $value", ({ value, expected }) => {
  expect(getFuelForMass(value)).toBe(expected);
});
