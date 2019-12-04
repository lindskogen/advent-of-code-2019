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

const walkPath = (path: Path): Map<string, number> => {
  const points = new Map<string, number>();

  let x = 0;
  let y = 0;
  let steps = 0;

  path.forEach(([direction, distance]) => {
    const [dx, dy] = directionMap[direction];
    range(distance).forEach(() => {
      x += dx;
      y += dy;
      steps += 1;

      points.set(`${x}_${y}`, steps);
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

  const intersections = intersection(
    new Set(points1.keys()),
    new Set(points2.keys())
  );

  const distances = [...intersections].map(point => {
    const d1 = points1.get(point);
    const d2 = points2.get(point);
    if (d1 === undefined || d2 === undefined) {
      throw new Error(`Point ${point} not in both sets`);
    }
    return d1 + d2;
  });

  return Math.min(...distances);
};
