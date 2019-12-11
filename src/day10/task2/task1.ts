import {
  countAstroids,
  findMostConnectedAstroid,
  parseInput,
  parseKey,
  stringifyKey
} from "../task1/task1";

interface Position {
  x: number;
  y: number;
}

const getGcdAngle = (a: Position, b: Position): number =>
  ((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90 + 360) % 360;

export const runProgram = (data: string): string[] => {
  const [astroidCountMap, distanceMap] = countAstroids(parseInput(data));

  const [[x0, y0]] = findMostConnectedAstroid(astroidCountMap);
  const astroidPos = { x: x0, y: y0 };
  const stringCoord = stringifyKey([x0, y0]);

  const distancesFromStation = distanceMap[stringCoord];

  const anglesAndDistances = Object.keys(distancesFromStation)
    .map(ng => {
      const [coord, dist] = distancesFromStation[ng];
      const [x, y] = parseKey(coord);

      return {
        coord,
        angle: getGcdAngle(astroidPos, { x, y }),
        distance: dist
      };
    })
    .sort((a, b) => a.angle - b.angle);

  return anglesAndDistances.map(({ distance, angle, coord }, index) => coord);
};
