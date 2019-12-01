import { getFuel } from "../task1";


test.each`
  value     | expected
  ${12}     | ${2}
  ${14}     | ${2}
  ${1969}   | ${654}
  ${100756} | ${33583}
`("getFuel returns $expected for example input: $value", ({ value, expected }) => {
  expect(getFuel(value)).toBe(expected);
});
