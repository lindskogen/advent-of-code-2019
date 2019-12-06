type OrbitRelation = [string, string];
type Planets = Record<string, string[] | undefined>;

export const parseInput = (input: string): OrbitRelation[] =>
  input.split("\n").map(str => {
    const [s1, s2] = str.split(")");
    return [s1, s2];
  });

const sum = (numbers: number[]): number =>
  numbers.reduce((acc, curr) => acc + curr, 0);

const countChildren = (
  obj: Planets,
  numberOfParents: number,
  planetId: string
): number => {
  const orbitsForPlanetId = obj[planetId];
  if (orbitsForPlanetId) {
    return (
      numberOfParents +
      sum(
        orbitsForPlanetId.map(pid =>
          countChildren(obj, numberOfParents + 1, pid)
        )
      )
    );
  } else {
    return numberOfParents;
  }
};

export const runProgram = (orbits: OrbitRelation[]) => {
  let obj: Planets = {};
  orbits.forEach(([parent, child]) => {
    obj[parent] = (obj[parent] ?? []).concat(child);
  });

  return countChildren(obj, 0, "COM");
};
