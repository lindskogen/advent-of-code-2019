type AstroidMap = boolean[][];
type AstroidCountMap = Record<string, number>;

export const parseInput = (input: string): AstroidMap =>
  input.split("\n").map(line => line.split("").map(c => c === "#"));

const stringifyKey = (x: [number, number]) => `${x[0]},${x[1]}`;

const parseKey = (s: string): [number, number] => {
  const [x, y] = s.split(",").map(i => parseInt(i, 10));
  return [x, y];
};

export const mapInput = (astroidMap: AstroidMap): AstroidCountMap => {
  const map: AstroidCountMap = {};
  astroidMap.forEach((list, x) => {
    list.forEach((item, y) => {
      if (item) {
        map[stringifyKey([x, y])] = 1;
      }
    });
  });
  return map;
};

const cartesianProduct = <T, V>(setA: T[], setB: V[]): [T, V][] => {
  if (!setA || !setB || !setA.length || !setB.length) {
    return [];
  }
  const product: [T, V][] = [];
  for (let indexA = 0; indexA < setA.length; indexA += 1) {
    for (let indexB = 0; indexB < setB.length; indexB += 1) {
      product.push([setA[indexA], setB[indexB]]);
    }
  }
  return product;
};

const gcd = (x: number, y: number): number => {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    let t = y;
    y = x % y;
    x = t;
  }
  return x;
};

const gcdKey = (x1: number, y1: number, x2: number, y2: number): string => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const div = gcd(dx, dy);

  if (div === 0) {
    return `${dx}/${dy}`;
  } else {
    return `${dx / div}/${dy / div}`;
  }
};

const distance = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.hypot(x2 - x1, y2 - y1);

export const countAstroids = (astroidMap: AstroidMap): AstroidCountMap => {
  const baseMap = mapInput(astroidMap);

  const coords = Object.keys(baseMap);

  const pairs = cartesianProduct(coords, coords);

  const childAngleDistanceMap: Record<
    string,
    Record<string, [string, number]>
  > = {};

  pairs.forEach(([p1, p2]) => {
    if (p1 === p2) {
      return;
    }

    const [x1, y1] = parseKey(p1);
    const [x2, y2] = parseKey(p2);

    const angle = gcdKey(x1, y1, x2, y2);

    const dist = distance(x1, y1, x2, y2);

    if (!childAngleDistanceMap[p1]) {
      childAngleDistanceMap[p1] = {};
    }
    if (!childAngleDistanceMap[p1][angle]) {
      childAngleDistanceMap[p1][angle] = [p2, dist];
    } else {
      const [p, d] = childAngleDistanceMap[p1][angle];
      if (d > dist) {
        childAngleDistanceMap[p1][angle] = [p2, dist];
      }
    }
  });

  coords.forEach(coord => {
    baseMap[coord] = Object.keys(childAngleDistanceMap[coord]).length;
  });

  return baseMap;
};

export const findMostConnectedAstroid = (
  countMap: AstroidCountMap
): [[number, number], number] => {
  const coords = Object.keys(countMap);
  let maxCoord = coords[0];
  let max = 0;
  coords.forEach(coord => {
    if (countMap[coord] > max) {
      max = countMap[coord];
      maxCoord = coord;
    }
  });

  return [parseKey(maxCoord), max];
};
