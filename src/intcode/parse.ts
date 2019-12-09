export const parseInput = (input: string): number[] =>
  input.split(",").map(str => parseInt(str, 10));
