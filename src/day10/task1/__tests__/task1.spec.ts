import { countAstroids, findMostConnectedAstroid, mapInput, parseInput } from "../task1";

const input1 = `.#..#
.....
#####
....#
...##`;

const input2 = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;

const input3 = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;

test.each`
  value | expected
  ${input1} | ${{
  "1,0": 1,
  "4,0": 1,
  "0,2": 1,
  "1,2": 1,
  "2,2": 1,
  "3,2": 1,
  "4,2": 1,
  "4,3": 1,
  "3,4": 1,
  "4,4": 1
}}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected }) => {
    expect(mapInput(parseInput(value))).toEqual(expected);
  }
);

const correctAnswer = {
  "1,0": 7,
  "4,0": 7,
  "0,2": 6,
  "1,2": 7,
  "2,2": 7,
  "3,2": 7,
  "4,2": 5,
  "4,3": 7,
  "3,4": 8,
  "4,4": 7
};

test("it works for input", () => {
  const astroidCountMap = countAstroids(parseInput(input1))[0];
  expect(astroidCountMap).toEqual(correctAnswer);
  expect(findMostConnectedAstroid(astroidCountMap)).toEqual([[3, 4], 8]);
});

test("it works for input2", () => {
  const astroidCountMap = countAstroids(parseInput(input2))[0];
  expect(findMostConnectedAstroid(astroidCountMap)).toEqual([[5, 8], 33]);
});

test("it works for input3", () => {
  const astroidCountMap = countAstroids(parseInput(input3))[0];
  expect(findMostConnectedAstroid(astroidCountMap)).toEqual([[11, 13], 210]);
});
