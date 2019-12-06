type OrbitRelation = [string, string];
type Planets = Record<string, string | undefined>;

const findParents = (obj: Planets, planetId: string): string[] => {
  const parent = obj[planetId];

  if (parent) {
    return [planetId].concat(findParents(obj, parent));
  } else {
    return [planetId];
  }
};

export const runProgram = (orbits: OrbitRelation[]) => {
  let obj: Planets = {};
  orbits.forEach(([parent, child]) => {
    obj[child] = parent;
  });

  const yourParents = findParents(obj, "YOU");
  const santasParents = findParents(obj, "SAN");

  const commonParent = yourParents.find(parent =>
    santasParents.includes(parent)
  ); //?

  if (!commonParent) {
    throw new Error("Found no common parent");
  }

  return (
    yourParents.indexOf(commonParent) + santasParents.indexOf(commonParent) - 2
  );
};

