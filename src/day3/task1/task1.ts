export const parseInput = (input: string): string[] => input.split("\n");

type Direction = "R" | "L" | "U" | "D";

type Step = [Direction, number];
type Path = Step[];

const directionMap: Record<Direction, [number, number]> = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, -1],
  D: [0, 1]
};

const parseLine = (input: string): Path =>
  input
    .split(",")
    .map(token => [
      token.charAt(0) as Direction,
      parseInt(token.substr(1), 10)
    ]);

const range = (x: number) => [...Array(x).keys()];

const walkPath = (path: Path): Set<string> => {
  const points = new Set<string>();

  let x = 0;
  let y = 0;

  path.forEach(([direction, distance]) => {
    const [dx, dy] = directionMap[direction];
    range(distance).forEach(() => {
      x += dx;
      y += dy;

      points.add(`${x}_${y}`);
    });
  });

  return points;
};

const intersection = <T>(s1: Set<T>, s2: Set<T>): Set<T> =>
  new Set<T>([...s1].filter(x => s2.has(x)));

export const runProgram = (lines: string): number => {
  const [line1, line2] = parseInput(lines);
  const path1 = parseLine(line1);
  const points1 = walkPath(path1);

  const path2 = parseLine(line2);
  const points2 = walkPath(path2);

  const intersections = intersection(points1, points2);

  const distances = [...intersections].map(point => {
    const [x, y] = point.split("_").map(i => parseInt(i, 10));
    return Math.abs(x) + Math.abs(y);
  });

  return Math.min(...distances);
};
