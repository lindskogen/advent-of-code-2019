import {
  countAstroids,
  findMostConnectedAstroid,
  mapInput,
  parseInput
} from "../task1";

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
  "0,1": 1,
  "0,4": 1,
  "2,0": 1,
  "2,1": 1,
  "2,2": 1,
  "2,3": 1,
  "2,4": 1,
  "3,4": 1,
  "4,3": 1,
  "4,4": 1
}}
`(
  "runProgram returns $expected for example input: $value",
  ({ value, expected }) => {
    expect(mapInput(parseInput(value))).toEqual(expected);
  }
);

const correctAnswer = {
  "0,1": 7,
  "0,4": 7,
  "2,0": 6,
  "2,1": 7,
  "2,2": 7,
  "2,3": 7,
  "2,4": 5,
  "3,4": 7,
  "4,3": 8,
  "4,4": 7
};

test("it works for input", () => {
  const astroidCountMap = countAstroids(parseInput(input1));
  expect(astroidCountMap).toEqual(correctAnswer);
  expect(findMostConnectedAstroid(astroidCountMap)).toEqual([[4, 3], 8]);
});

test("it works for input2", () => {
  const astroidCountMap = countAstroids(parseInput(input2));
  expect(findMostConnectedAstroid(astroidCountMap)).toEqual([[8, 5], 33]);
});

test("it works for input3", () => {
  const astroidCountMap = countAstroids(parseInput(input3));
  expect(findMostConnectedAstroid(astroidCountMap)).toEqual([[13, 11], 210]);
});
